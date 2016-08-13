the <h1>Minimal spanning tree. The Kruskal's algorithm with disjoint sets</h1>

<p>Formulation of the problem and description of algorithm of Kruskal, see <algohref=mst_kruskal>here</algohref>.</p>
<p>Here will consider the implementation using data structures <algohref=dsu>"the DSU" (DSU)</algohref> that will allow to reach asymptotic behavior of <b>O (M log N)</b>.</p>
the <h3>Description</h3>
<p>in the same way as in a simple version of the algorithm of Kruskal, let's sort all edges by non-decreasing weight. Then put each node in your tree (i.e. the set) by calling the DSU MakeSet function - it takes in total O (N). Iterate over all edges (in the sorted order) and for each edge in O (1) determine whether the ends of different trees (using two calls to FindSet in O (1)). Finally, merging the two trees will be a challenge Union is also O (1). So we have total complexity O (M log N + N + M) = O (M log N).</p>
the <h3>Implementation</h3>
<p>To reduce the amount of code to implement all operations not as separate functions, but directly in the code of the Kruskal's algorithm.</p>
<p>Here will be used randomizearray version of the DSU.</p>
<code>vector&lt;int> p (n);

dsu_get int (int v) {
return (v == p[v]) ? v : (p[v] = dsu_get (p[v]));
}

void dsu_unite (int a, int b) {
a = dsu_get (a);
b = dsu_get (b);
if (rand() & 1)
swap (a, b);
if (a != b)
p[a] = b;
}

... in the main () function: ...

int m;
vector &lt; pair &lt; int, pair < int,int> > > g; // weight - top 1 - top 2
... reading graph ...

int cost = 0;
vector &lt; pair&lt;int,int> > res;

sort (g.begin(), g.end());
p.resize (n);
for (int i=0; i&lt;n; ++i)
p[i] = i;
for (int i=0; i&lt;m; ++i) {
int a = g[i].second.first, b = g[i].second.second, l = g[i].first;
if (dsu_get(a) != dsu_get(b)) {
cost += l;
res.push_back (g[i].second);
dsu_unite (a, b);
}
}</code>
