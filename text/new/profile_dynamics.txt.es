the <h1>Speaker profile. The task of the "parquet"</h1>

<p>Typical problems on the dynamics of the profile are:</p>
the <ul>
the <li>to find the number of ways of tiling a field some figures</li>
the <li>to find the tessellation with the smallest number of pieces</li>
the <li>to find the tiling with minimum number of unused cells</li>
the <li>to find the tiling with minimum number of figures is that you can't add another one</li>
</ul>
the <h2>Task "Parquet"</h2>
<p>There is a rectangular area of size NxM. Need to find the number of ways to tile the square shapes 1x2 (empty cells should not remain, the figures must not intersect each other).</p>
<p>will Build up the momentum: D[I][Mask], where I=1..N, Mask=0..2^M-1. I represents the number of lines in the current field, and Mask - a profile of the last line in the current field. If the j-th bit in Mask is zero, then the profile is on "normal level", but if 1 here cut depth 1. The answer, obviously, will be D[N][0].</p>
<p>to Build the kind of momentum going, just following all I=1..N, all the masks Mask=0..2^M-1, and for each mask will do forward jumps, i.e. to add a new shape in every way possible.</p>
<p><b>Implementation:</b></p>
<code>int n, m;
vector &lt; vector&lt;long long> > d;


void calc (int x = 0, int y = 0, int mask = 0, int next_mask = 0)
{
if (x == n)
return;
if (y >= m)
d[x+1][next_mask] += d[x][mask];
else
{
int my_mask = 1 &lt;&lt; y;
if (mask & my_mask)
calc (x, y+1, mask, next_mask);
else
{
calc (x, y+1, mask, next_mask | my_mask);
if (y+1 &lt; m && ! (mask & my_mask) && ! (mask & (my_mask &lt;&lt; 1)))
calc (x, y+2, mask, next_mask);
}
}
}


int main()
{
cin >> n >> m;

d.resize (n+1, vector < long long> (1&lt;&lt;m));
d[0][0] = 1;
for (int x=0; x&lt;n; ++x)
for (int mask=0; mask&lt;(1&lt;&lt;m); ++mask)
calc (x, 0, mask, 0);

cout &lt;&lt; d[n][0];

}</code>
