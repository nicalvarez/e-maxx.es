the <h1>Checking the count on dualnote and split into two lobes</h1>

<p>Let the given undirected graph. You want to check whether it is bipartite, i.e. can divide its vertices into two shares so that there are no edges connecting two vertices of one share. If the graph is bipartite, then choose to withdraw the shares.</p>
<p>we Solve this problem by using <algohref=bfs>BFS</algohref> O (M).</p>
the <h2>a Sign of dualnote</h2>
<p>Theorem. A graph is bipartite if and only if all its cycles have even length.</p>
<p>However, from a practical point of view, to find all simple cycles uncomfortable. Much easier to check the count on dualnote following algorithm:</p>
the <h2>the Algorithm</h2>
<p>will Produce the BFS. I.e. let us run a BFS from each unvisited vertex. The node from which we begin to go, we put in the first part. In the process of BFS, if we go to any new vertex, then we put it in proportion, than the share of the current vertex. If we're trying to go over the edge in a vertex which is already visited, then we check that this node and current node are located in different lobes. Otherwise, the graph is not bipartite.</p>
<p>At the end of the algorithm, either we will discover that the graph is not bipartite, or find a partition of the graph vertices into two lobes.</p>
the <h2>Implementation</h2>
<code>int n;
vector &lt; vector&lt;int> > g;
... reading graph ...

vector&lt;char> part (n, -1);
bool ok = true;
vector&lt;int> q (n);
for (int st=0; st < n; st++)
if (part[st] == -1) {
int h=0, t=0;
q[t++] = st;
part[st] = 0;
while (h < t) {
int v = q[h++];
for (size_t i=0; i < g[v].size(); ++i) {
int to = g[v][i];
if (part[to] == -1)
part[to] = !part[v], q[t++] = to;
else
ok &= part[to] != part[v];
}
}
}

puts (ok ? "YES" : "NO");</code>
