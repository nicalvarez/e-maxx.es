
\h1{ Finding the incircle of a convex polygon is a method of "compression" ("shrinking sides") for $O (n \log n)$ }


Given a convex polygon with $n$ vertices. You want to find the inscribed circle of maximum radius: i.e., to find its radius and the coordinates of the center. (If in this radius there are several options of centers, it is enough to find any of them.)

In contrast to the above \algohref=inscribed_circle_ternary{here} of the double ternary search, asymptotics of this algorithm --- $O (n \log n)$ --- does not depend on the constraints on the coordinates and on the accuracy required, and therefore this algorithm is suitable for much larger $n$ and large restrictions on the amount of coordinates.

Thanks \bf{\href=http://acm.uva.es/board/memberlist.php?mode=viewprofile&u=4424{Ivan Krasilnikov (mf)}} for description of this beautiful algorithm.


\h2{ Algorithm }

So, given convex polygon. Let's start at the same time and with the same speed \bf{move} all its sides parallel to themselves into the polygon:

\img{inscribed_circle_shrinking.jpg}

Let, for convenience, this movement occurs at a rate of 1 coordinate unit / second (i.e. the time in some sense equal to the distance after the first unit of time each point will overcome the distance equal to one).

In the process of this movement of sides of the polygon will gradually disappear (to contact point). Sooner or later, the whole polygon will shrink into a point or cut, and this moment of time $t$ will be \bf{answer} --- the desired radius (and the center of the desired circle will lie on this segment). In fact, if we shrink this polygon by the thickness $t$ in all directions, and he went to a dot/period, it means that there is a point, spaced from all sides of the polygon at a distance of $t$, and for large distances --- such a point does not already exist.

So, we need to learn how to effectively simulate the compression process. Learn how to do this for each side \bf{to determine the time} after which it will shrink to a point.

We need to examine carefully the process of motion of the parties. Note that the polygon vertices are always moving along the bisectors of the angles (this follows from the equality of the corresponding triangles). But then the question of time, after which the party will shrink, boils down to the question of the definition of height $H$ of the triangle, which is a known side length $L$ and two adjacent angle $\alpha$ and $\beta$. Using, for example, the theorem of sines, we get the formula:

$$ H = L \cdot \frac{ \sin \alpha \cdot \sin \beta }{ \sin (\alpha + \beta) }. $$

Now we know how $O(1)$ to determine the time after which the party will shrink to a point.

Get these times for each side in a kind of \bf{a data structure for extracting minimum}, for example, a red-black tree ($\rm set$ in C++).

Now if we could get a side \bf{the smallest $H$}, the first side will shrink to a point --- at the time $H$. If the polygon is not yet squished into a dot/period, then this side should \bf{delete} from the polygon, and continue the algorithm for the remaining parties. When an edge is removed we need \bf{connect} with each other its left and right neighbor, \bf{extending} them to the point of their intersection. You will need to find this intersection point, to convert the length of two sides and their time of extinction.

In the implementation for each side will have to store the number of its left and right neighbor (thereby building a doubly linked list from the sides of the polygon). This allows for the removal our side and linking her two neighbors for $O(1)$.

If removed, it turns out that her neighbors \bf{parallel}, it means that the polygon then the compression degenerates to a point/segment, so we can stop the algorithm and return the answer time of the disappearance of the current side (so that problems with parallel sides does not occur).

If this situation with parallel sides does not occur, the algorithm will work till the moment at which the polygon will be only two sides --- and then the answer to the problem would be the removal of the previous hand.

Obviously, the asymptotic behavior of this algorithm is $O (n \log n)$, because the algorithm consists of $n$ steps, each of which is removed on one side (which is performed several operations with $\rm set$ time to $O (n \log n)$).


\h2{ the Implementation }

Here is an implementation of the algorithm above. This implementation returns only the desired radius of the circle; however, the addition of the output center of the circle will not be easy.

This algorithm is elegant because of computational geometry only requires finding the angle between two sides, the intersection of two straight lines and two checking lines on parallelism.

Note. It is assumed that applied to the input polygon --- \bf{strictly convex}, i.e., no three points are collinear.

\code
const double EPS = 1E-9;
const double PI = ...;

struct pt {
double x, y;
pt() { }
pt (double x, double y) : x(x) y(y) { }
pt operator- (const pt & p) const {
return pt (x-p.x, y-p.y);
}
};

double dist (const pt & a, const pt & b) {
return sqrt ((a.x-b.x)*(a.x-b.x) + (a.y-b.y)*(a.y-b.y));
}

double get_ang (const pt & a, const pt & b) {
double ang = abs (atan2 (a.y, a.x) - atan2 (b.y, b.x));
return min (ang, 2*PI-ang);
}

struct line {
double a, b, c;
line (const pt & p, const pt & q) {
a = p.y - q.y;
 b = q.x - p.x;
c = - a * p.x - b * p.y;
double z = sqrt (a*a + b*b);
a/=z, b=z, c/=z;
}
};

double det (double a, double b, double c, double d) {
return a * d - b * c;
}

pt intersect (const line & n, const line & m) {
double zn = det (n.a, n.b, m.a, m.b);
return pt (
- det (n.c, n.b, m.c, m.b) / zn,
- det (n.a, n.c, m.a, m.c) / zn
);
}

bool parallel (const line & n, const line & m) {
return abs (det (n.a, n.b, m.a, m.b)) < EPS;
}

double get_h (const pt & p1, const pt & p2,
const pt & l1, const pt & l2, const pt & r1, const pt & r2)
{
pt q1 = intersect (line (p1, p2), line (l1, l2));
pt q2 = intersect (line (p1, p2), line (r1, r2));
double l = dist (q1, q2);
double alpha = get_ang (l2 - l1, p2 - p1) / 2;
double beta = get_ang (r2 - r1, p1 - p2) / 2;
return l * sin(alpha) * sin(beta) / sin(alpha+beta);
}

struct cmp {
bool operator() (const pair<double,int> & a, const pair<double,int> & b) const {
if (abs (a.first - b.first) > EPS)
return a.first < b.first;
return a.second < b.second;
}
};

int main() {
int n;
vector<pt> p;
... read n and p ...

vector<int> next (n) prev (n);
for (int i=0; i<n; ++i) {
next[i] = (i + 1) % n;
prev[i] = (i - 1 + n) % n;
}

set < pair<double,int>, cmp > q;
vector<double> h (n);
for (int i=0; i<n; ++i) {
h[i] = get_h (
p[i], p[next[i]],
p[i], p[prev[i]],
p[next[i]], p[next[next[i]]]
);
q.insert (make_pair (h[i], i));
}

double last_time;
while (q.size() > 2) {
last_time = q.begin()->first;
int i = q.begin()->second;
q.erase (q.begin());

next[prev[i]] = next[i];
prev[next[i]] = prev[i];
int nxt = next[i], nxt1 = (nxt+1)%n,
prv = prev[i], prv1 = (prv+1)%n;
if (parallel (line (p[nxt], p[nxt1]), line (p[prv], p[prv1])))
break;

q.erase (make_pair (h[nxt], nxt));
q.erase (make_pair (h[prv], prv));

h[nxt] = get_h (
p[nxt], p[nxt1],
p[prv1], p[prv],
p[next[nxt]], p[(next[nxt]+1)%n]
);
h[prv] = get_h (
p[prv], p[prv1],
p[(prev[prv]+1)%n], p[prev[prv]],
p[nxt], p[nxt1]
);

q.insert (make_pair (h[nxt], nxt));
q.insert (make_pair (h[prv], prv));
}

cout << last_time << endl;
}
\endcode

The main function here is $get\_h()$, which is on the side and its left and right neighbors calculates the ending time of this side. This is searched for the point of intersection of that side with the neighbors, and then according to the above equation is the calculation of the required time.
