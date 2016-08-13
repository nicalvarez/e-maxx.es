the <h1>Finding area of a simple polygon</h1>

<p>Suppose you are given a simple polygon (i.e. no self-intersections, but not necessarily convex) defined by the coordinates of its vertices in the clockwise or counter-clockwise. You want to find its area.</p>
the <h2>Method 1</h2>
<p>It's easy to do, if we iterate over all edges and fold the area of the trapezoid bounded by each rib. The area needs to be taken with that sign, how it will turn out (thanks to mark all the "extra" area will be reduced). I.e. the formula is as follows:</p>
<formula>S += (X2 - X1) * (Y1 + Y2) / 2</formula>
<p>Code:</p>
<code>double sq (const vector&lt;point> & fig)
{
double res = 0;
for (unsigned i=0; i&lt;fig.size(); i++)
{
point
p1 = i ? fig[i-1] : fig.back(),
p2 = fig[i];
res += (p1.x - p2.x) * (p1.y + p2.y);
}
return fabs (res) / 2;
}</code>
the <h2>Method 2</h2>
<p>it is Possible to arrive other way. We choose arbitrarily a point O, let's iterate over all the edges, adding to the response oriented area of the triangle formed by edge a and the point O (see <algohref=oriented_area>Focused area of a triangle</algohref>). Again, thanks to mark, all the extra size will be reduced, and there will be only answer.</p>
<p>This method is good because it is easier to generalize to more complicated cases (e.g., when some side - not straight, and arc).</p>
