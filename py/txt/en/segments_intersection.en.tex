\h1{Intersection of two line segments}

Given two segments $AB$ and $CD$ (they can degenerate into a point). You want to find their intersection: it may be empty (if the segments do not intersect) can be a single point, and can be a whole segment (if segments overlap each other).


\h2{Algorithm}

Working with cuts will be as straight with the following: construct two segments of the equation them direct to find out whether are not parallel lines. If not a direct parallel, it's simple: find their point of intersection and check that it belongs to both segments (it is enough to check that the point belongs to each interval in the projection on the axis $X$ axis and $Y$ separately). As a result, in this case, the answer will be either "empty" or only found the point.

More difficult case --- if the direct appeared to be parallel (this includes the case where one or both of the segment degenerated into a point). In this case, it is necessary to check that both of the segment lie on the same line (or, in the case when they both degenerated to the point that this point is the same). If not, then the answer is --- "empty". If so, then the answer is the intersection of two segments lying on the same straight line that is fairly simple --- get max of left and min of right-wing ends.

At the beginning of the algorithm write the so-called "check for bounding box" --- first, it is necessary for the case when two segments are collinear, and secondly, she, as a lightweight verification, allows the algorithm to work faster on average for random tests.


\h2{the Implementation}

We present here a complete implementation, including all helper functions for working with points and lines.

The main here is a function $\rm intersect$, which intersects two given to her cut, and if they intersect at least one point, then returns $\rm true$, and in the case $\rm left$ and $\rm right$ returns the start and end of the segment-response (in particular, when the answer --- is a single point return start and end are the same).

\code
const double EPS = 1E-9;

struct pt {
double x, y;

bool operator< (const pt & p) const {
return x < p.x-EPS || abs(x-p.x) < EPS && y < p.y - EPS;
}
};

struct line {
double a, b, c;

line() {}
line (pt p, pt q) {
a = p.y - q.y;
b = q.x - p.x;
c = - a * p.x - b * p.y;
norm();
}

void norm() {
double z = sqrt (a*a + b*b);
if (abs(z) > EPS)
a /= z, b= z, c /= z;
}

double dist (pt p) const {
return a * p.x + b * p.y + c;
}
};

#define det(a,b,c,d) (a*d-b*c)

inline bool betw (double l, double r, double x) {
return min(l,r) <= x + EPS && x <= max(l,r) + EPS;
}

inline bool intersect_1d (double a, double b, double c, double d) {
if (a > b) swap (a, b);
if (c > d) swap (c, d);
return max (a, c) <= min (b, d) + EPS;
}

bool intersect (pt a, pt b, pt c, pt d, pt & left, pt & right) {
if (! intersect_1d (a.x b.x, c.x d.x) || ! intersect_1d (a.y, b.y, c.y, d.y))
return false;
line m (a, b);
line n (c, d);
double zn = det (m.a, m.b, n.a, n.b);
if (abs (zn) < EPS) {
if (abs (m.dist (c)) > EPS || abs (n.dist (a)) > EPS)
return false;
if (b < a) swap (a, b);
if (d < c) swap (c, d);
left = max (a, c);
right = min (b, d);
return true;
}
else {
left.x = right.x = - det (m.c, m.b, n.c, n.b) / zn;
left.y = right.y = - det (m.a, m.c, n.a, n.c) / zn;
return betw (a.x b.x, left.x)
&& betw (a.y, b.y, left.y)
&& betw (c.x d.x, left.x)
&& betw (c.y, d.y, left.y);
}
}
\endcode

