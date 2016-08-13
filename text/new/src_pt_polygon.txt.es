the <h1>Check point belonging to the convex polygon</h1>

<p>Given a convex polygon with N vertices, the coordinates of all vertices clochicine (although this does not change the essence of the decision); the vertices are given in counterclockwise (otherwise you just need to sort them). Requests are required for each point to determine whether it lies inside the polygon or not (the borders of the polygon are included). Each request will respond to the on-line in O (log N). Pre-processing of the polygon will be executed in O (N).</p>
the <h2>the Algorithm</h2>
<p>to deal with will <b>binary search corner</b>.</p>
<p>One of the solutions to that. Choose the point with the smallest X-coordinate (if several, choose the lowest, i.e. with the smallest Y). About this point, denote it by Zero, all the remaining vertices of the polygon lie in the right half-plane. Further, note that all the polygon vertices are already sorted by the angle relative to Zero (this follows from the fact that the polygon is convex, and already ordered counterclockwise), and all angles are in the interval (-&pi;/2 ; &pi;/2].</p>
<p>Let him do the next request is some point P. Consider its polar angle relative to point Zero. Find by binary search we have two such neighbouring vertices L and R of the polygon that the polar angle P lies between the polar angles L and R. thus, we find the sector of the polygon, in which lies the point P, and we only need to check whether a point P in the triangle (Zero,L,R). This can be done, for example, using <algohref=oriented_area>Focused area of a triangle and the Predicate "clockwise"</algohref> through clockwise or counterclockwise is a triple of vertices (R,L,P).</p>
<p>Thus, we need O (log N) we find the sector of the polygon, and then in O (1) check the point to the triangle, and therefore, the required asymptotic behavior achieved. Pre-processing of the polygon is to predpochitaete polar angles for all points, although, these calculations can also be transferred to the stage binary search.</p>
the <h2>notes on implementation</h2>
<p>to determine the polar angle, you can use standard function atan2. Thus, we obtain a very short and easy solution, but instead may have problems with accuracy.</p>
<p>Given that initially all coordinates are integer, we can obtain the solution, do not use fractional arithmetic.</p>
<p>note that the polar angle of point (X,Y) relative to the origin is uniquely determined by the fraction Y/X, provided that the point is in the right half-plane. Moreover, if one point a polar angle smaller than the other, then the fraction Y1/X1 will be less than Y2/X2, and Vice versa.</p>
<p>Therefore, to compare the polar angles of two points it is sufficient to compare fractions Y1/X1 and Y2/X2, which can be done in integer arithmetic.</p>
the <h2>Implementation</h2>
<p>This implementation assumes that this polygon does not have duplicate vertices, and the area of the polygon non-zero.</p>
<code>struct pt {
int x, y;
};

struct ang {
int a, b;
};

bool operator &lt; (const ang & p, const ang & q) {
if (p.b == 0 && q.b == 0)
return p.a &lt; q.a;
return p.a * 1ll * q.b &lt; p.b * 1ll * q.a;
}

long long sq (pt & a, pt & b pt & c) {
return a.x*1ll*(b.y-c.y) + b.x*1ll*(c.y-a.y) + c.x*1ll*(a.y-b.y);
}

int main() {

int n;
cin >> n;
vector < pt> p (n);
zero_id int = 0;
for (int i=0; i&lt;n; ++i) {
scanf ("%d%d", &p[i].x, &p[i].y);
if (p[i].x &lt; p[zero_id].x || p[i].x == p[zero_id].x && p[i].y &lt; p[zero_id].y)
zero_id = i;
}
zero pt = p[zero_id];
rotate (p.begin(), p.begin()+zero_id, p.end());
p.erase (p.begin());
n--;

vector&lt;ang> a (n);
for (int i=0; i&lt;n; ++i) {
a[i].a = p[i].y - zero.y;
a[i].b = p[i].x - zero.x;
if (a[i].a == 0)
a[i].b = a[i].b &lt; 0 ? -1 : 1;
}

for (;;) {
pt q; // another request
bool in = false;
if (q.x >= zero.x)
if (q.x == zero.x && q.y == zero.y)
in = true;
else {
ang my = { q.y-zero.y, q.x-zero.x };
if (my.a == 0)
my.b = my.b &lt; 0 ? -1 : 1;
vector < ang>::iterator it = upper_bound (a.begin(), a.end(), my);
if (it == a.end() && my.a == a[n-1].a && my.b == a[n-1].b)
it = a.end()-1;
if (it != a.end() && it != a.begin()) {
int p1 = int (it - a.begin());
if (sq (p[p1], p[p1-1], q) &lt;= 0)
in = true;
}
}
puts (in ? "INSIDE" : "OUTSIDE");
}

}</code>
