the <h1>Construction of the convex hull of the bypass Graham</h1>

<p>Given N points in the plane. To build their convex hull, i.e. the smallest convex polygon containing all these points.</p>
<p>We consider a method <b>Graham</b> (Graham) (proposed in 1972) with improvements by Andrew (Andrew) (1979). With its help it is possible to construct a convex hull for the time <b>O (N log N)</b> using only comparison operations, addition and multiplication. The algorithm is asymptotically optimal (it is proved that there is no algorithm with better asymptotic behavior), although in some problems it unacceptable (in the case of parallel processing or online processing).</p>
<h2>Description</h2>
<p>the Algorithm. Find the leftmost and the rightmost points A and B (if several such points, take the lowest among leftists, and among the very top right). It is clear that both A and B will fall in the convex hull. Next, you will through them AB, dividing the set of all points on the upper and lower subsets S1 and S2 (the point on the line, can be attributed to any lots - they still will not enter the shell). Points A and B is attributed to both sets. Now let us build for the upper casing S1, and S2 is the lower shell, and combine them to receive an answer. To get, say, top shell, you need to sort all the points on the abscissa, then go through all the points, considering at each step except for the previous point, there are two points included in the shell. If the current triplet of points forms a right turn (which is easily verified using <algohref=oriented_area>Focused area</algohref>), the nearest neighbor must be removed from the shell. In the end, will only point included in the convex hull.</p>
<p>so, the algorithm consists in sorting all the points on the abscissa and two (in the worst case) rounds all points, i.e. the required complexity O (N log N) is achieved.</p>
the <h2>Implementation</h2>
<code>struct pt {
double x, y;
};

bool cmp (pt a, pt b) {
return a.x &lt; b.x || a.x == b.x && a.y &lt; b.y;
}

bool cw (pt a, pt b, pt c) {
return a.x*(b.y-c.y)+b.x*(c.y-a.y)+c.x*(a.y-b.y) &lt; 0;
}

bool ccw (pt a, pt b, pt c) {
return a.x*(b.y-c.y)+b.x*(c.y-a.y)+c.x*(a.y-b.y) > 0;
}

void convex_hull (vector < pt> & a) {
if (a.size() == 1) return;
sort (a.begin(), a.end(), &cmp);
pt p1 = a[0], p2 = a.back();
vector < pt> up, down;
up.push_back (p1);
down.push_back (p1);
for (size_t i=1; i&lt;a.size(); ++i) {
if (i==a.size()-1 || cw (p1, a[i], p2)) {
while (up.size()>=2 && !cw (up[up.size()-2], up[up.size()-1], a[i]))
up.pop_back();
up.push_back (a[i]);
}
if (i==a.size()-1 || ccw (p1, a[i], p2)) {
while (down.size()>=2 && !ccw (down[down.size()-2], down[down.size()-1], a[i]))
down.pop_back();
down.push_back (a[i]);
}
}
a.clear();
for (size_t i=0; i&lt;up.size(); ++i)
a.push_back (up[i]);
for (size_t i=down.size()-2; i>0; --i)
a.push_back (down[i]);
}</code>
