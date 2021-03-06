the <h1>Finding area of a Union of triangles. Vertical method of decomposition</h1>

<p>Given N triangles. You want to find the area of their Association.</p>
the <h2>Solution</h2>
<p>Here we look at the method <b>vertical decomposition</b>, which in geometry is often very important.</p>
<p>so, we have N triangles that can arbitrarily overlap with each other. Get rid of these intersections with the vertical decomposition: find all intersection points of all segments (forming the triangles), and sort the found point on the abscissa. Suppose we get some array B. will move through the array. On the i-th step, consider the elements B[i] and B[i+1]. We have a vertical band between straight lines X = B[i] X = B[i+1], and, according to the construction of the array B inside of the band segments do not overlap with each other. Hence, in this strip triangles cut to the trapezoid, and sides of these trapezoids inside the band do not intersect at all. We will move on both sides of these trapezoids from the bottom up, and fold the area of the trapezoids, making sure that each piece was counted exactly once. In fact, this process is very similar to the processing of nested parentheses. Adding together the areas of the trapezoids within each strip, and adding the results for all the strips, and we'll find an answer to the size of the Union of triangles.</p>
<p>Consider again the process of adding the areas of trapezoids, already from the point of view of implementation. We searched all sides of all triangles, and if any side (not vertical we vertical sides are not needed, and even Vice versa, will greatly hinder) goes to the vertical bar (fully or partially), then we put the side in a vector, it's best to do in this form: Y coordinate at the point of intersection with the side boundaries of the vertical bars and the number of the triangle. After we have constructed the vector that contains the pieces of the parties, sort it by value Y: Y, first left, then right at y In the result in the first vector element will contain the bottom side of the lower trapezoid. Now we just go on the obtained vector. Let i be the current item; this means that the i-th piece is the underside of some trapeze, some unit (which can contain multiple trapezoids), the square of which we want immediately to add to the answer. So we set a count of triangles is 1, and climb up intervals, and increment that, if we meet a side of some kind of triangle for the first time, and decrement the counter, if we find the triangle a second time. If in some period j, the counter became equal to zero, we find the upper bound of the unit - this is where we stop, we add the area of the trapezoid bounded by segments i and j, and assign i j+1, and repeat the process all over again.</p>
<p>so, due to the vertical decomposition method we solved the task of geometric primitives using only the intersection of two line segments.</p>
the <h2>Implementation</h2>
<code>struct segment {
int x1, y1, x2, y2;
};

struct point {
double x, y;
};

struct item {
double y1, y2;
int triangle_id;
};

struct line {
int a, b, c;
};

const double EPS = 1E-7;

void intersect (segment s1, segment s2, vector&lt;point> & res) {
line l1 = { s1.y1-s1.y2, s1.x2-s1.x1, l1.a*s1.x1+l1.b*s1.y1 },
l2 = { s2.y1-s2.y2, s2.x2-s2.x1, l2.a*s2.x1+l2.b*s2.y1 };
double det1 = l1.a * l2.b - l1.b * l2.a;
if (abs (det1) < EPS) return;
point p = { (l1.c * 1.0 * l2.b - l1.b * 1.0 * l2.c) / det1,
(l1.a * 1.0 * l2.c - l1.c * 1.0 * l2.a) / det1 };
if (p.x >= s1.x1-EPS && p.x &lt;= s1.x2+EPS && p.x >= s2.x1-EPS && p.x &lt;= s2.x2+EPS)
res.push_back (p);
}

double segment_y (segment s, double x) {
return s.y1 + (s.y2 - s.y1) * (x - s.x1) / (s.x2 - s.x1);
}

bool eq (double a, double b) {
return abs (a-b) < EPS;
}

vector&lt;item> c;

bool cmp_y1_y2 (int i, int j) {
const item & a = c[i];
const item & b = c[j];
return a.y1 &lt; b.y1-EPS || abs (a.y1-b.y1) &lt; EPS && a.y2 &lt; b.y2-EPS;
}

int main() {

int n;
cin >> n;
vector&lt;segment> a (n*3);
for (int i=0; i&lt;n; ++i) {
int x1, y1, x2, y2, x3, y3;
scanf ("%d%d%d%d%d%d", &x1,&y1,&x2,&y2,&x3,&y3);
segment s1 = { x1,y1,x2,y2 };
segment s2 = { x1,y1,x3,y3 };
segment s3 = { x2,y2,x3,y3 };
a[i*3] = s1;
a[i*3+1] = s2;
a[i*3+2] = s3;
}

for (size_t i=0; i&lt;a.size(); ++i)
if (a[i].x1 > a[i].x2)
swap (a[i].x1, a[i].x2), swap (a[i].y1, a[i].y2);

vector&lt;point> b;
b.reserve (n*n*3);
for (size_t i=0; i&lt;a.size(); ++i)
for (size_t j=i+1; j&lt;a.size(); ++j)
intersect (a[i], a[j], b);

vector&lt;double> xs (b.size());
for (size_t i=0; i&lt;b.size(); ++i)
xs[i] = b[i].x;
sort (xs.begin(), xs.end());
xs.erase (unique (xs.begin(), xs.end(), &eq), xs.end());

double res = 0;
vector&lt;char> used (n);
vector&lt;int> cc (n*3);
c.resize (n*3);
for (size_t i=0; i+1&lt;xs.size(); ++i) {
double x1 = xs[i], x2 = xs[i+1];
size_t csz = 0;
for (size_t j=0; j&lt;a.size(); ++j)
if (a[j].x1 != a[j].x2)
if (a[j].x1 &lt;= x1+EPS && a[j].x2 >= x2-EPS) {
item it = { segment_y (a[j], x1), segment_y (a[j], x2), (int)j/3 };
cc[csz] = (int)csz;
c[csz++] = it;
}
sort (cc.begin(), cc.begin()+csz, &cmp_y1_y2);
double add_res = 0;
for (size_t j=0; j&lt;csz; ) {
item lower = c[cc[j++]];
used[lower.triangle_id] = true;
int cnt = 1;
while (cnt && j&lt;csz) {
char & cur = used[c[cc[j++]].triangle_id];
cur = !cur;
if (cur) cnt++; else cnt--;
}
item upper = c[cc[j-1]];
add_res += upper.y1 - lower.y1 + upper.y2 - lower.y2;
}
res += add_res * (x2 - x1) / 2;
}

cout.precision (8);
cout &lt;&lt; fixed &lt;&lt; res;

}</code>
