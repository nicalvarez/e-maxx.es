a <h1>Length of Association of segments to the direct O (N log N)</h1>

<p>Given N segments on a straight line, i.e. each segment is defined by a pair of coordinates (X1, X2). Consider the Union of these segments and find the length.</p>
<p>the Algorithm was proposed by Klee (Klee) in 1977. The algorithm works in O (N log N). It was proved that this algorithm is the fastest (asymptotically).</p>
<h2>Description</h2>
<p>Put all coordinates of endpoints of segments in the array X, and sort it by the value of the coordinates. An additional condition for sorting - in the event of equality of the coordinates of the first things to go left ends. In addition, for each element of the array will store, apply it to the left or to the right end of the segment. Now go through the entire array, a counter C having overlapping segments. If C is nonzero, then the result of adding the difference of X<sub>i</sub> - X<sub>i-1</sub>. If the current element refers to the left end, we increment C, otherwise decrease it.</p>
the <h2>Implementation</h2>
<code>unsigned segments_union_measure (const vector &lt;pair &lt;int,int> > & a)
{
unsigned n = a.size();
vector &lt;pair &lt;int,bool> > x (n*2);
for (unsigned i=0; i&lt;n; i++)
{
x[i*2] = make_pair (a[i].first, false);
x[i*2+1] = make_pair (a[i].second, true);
}

sort (x.begin(), x.end());

unsigned result = 0;
unsigned c = 0;
for (unsigned i=0; i&lt;n*2; i++)
{
if (c && i)
result += unsigned (x[i].first - x[i-1].first);
if (x[i].second)
c++;
else
c--;
}
return result;
}</code>
