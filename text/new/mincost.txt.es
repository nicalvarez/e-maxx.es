<h1>the Flow of minimum cost (min-cost-flow). The algorithm is extending paths</h1>

<p>Given the network G consisting of N vertices and M edges. Every edge (generally speaking, oriented, but on this occasion, see below) specified throughput (nonnegative integer) and the unit cost of flow along this edge (some integer). In the column specify a source S and a drain of T. Given a certain value of K the flow, you want to find a thread of this magnitude, and among all threads of this value to select the stream with the lowest cost ("the problem min-cost-flow").</p>
<p>Sometimes this is a bit different: you want to find the maximum flow minimum cost ("the problem min-cost-max-flow").</p>
<p>Both of these tasks quite effectively solved by the algorithm described below to increase of ways.</p>
<h2>Description</h2>
<p>the Algorithm is very similar to <algohref=edmonds_karp>algorithm the Edmonds-Karp compute the maximum flow</algohref>.</p>
the <h3>the Simplest case</h3>
<p>Consider first the simplest case when the graph - oriented, and between any pair of vertices is at most one edge (if an edge (i,j), edges (j,i) to not be).</p>
<p>Let U<sub>ij</sub> is the bandwidth of edge (i,j) if this edge exists. Let C<sub>ij</sub> is the cost per unit flow along the edge (i,j). Let F<sub>ij</sub> is the flow value along edge (i,j), initially all values are flows equal to zero.</p>
<p><b>Modify</b> network as follows: for each edge (i,j), we add to the network of so-called <b>reverse</b> edge (j,i) with capacity U<sub>ji</sub> = 0 and cost C<sub>ji</sub> = C<sub>ij</sub>. Since, under our assumption, the edge (j,i) to this network was then modified so the network still won't be a multigraph. In addition, throughout the algorithm will maintain the correct condition: F<sub>ji</sub> = F<sub>ij</sub>.</p>
<p>Define <b>residual</b> for some fixed flow F in the following way (actually, the same as in the algorithm Ford-Fulkerson): the residual network belong only unsaturated edges (i.e. F<sub>ij</sub> &lt; U<sub>ij</sub>), and the residual bandwidth of each rib as UPI<sub>ij</sub> = U<sub>ij</sub> F<sub>ij</sub>.</p>
<p>Actually <b>algorithm</b> min-cost-flow is as follows. At each iteration, the algorithm find the shortest path in the residual network from S to T (the shortest relative values of C<sub>ij</sub>). If the path has not been found, the algorithm terminates, the flow F is the sought. If the path was found, then we increase the ow along it as possible (i.e., we pass along this way, we find the minimum residual bandwidth among MIN_UPI edges of this path, and then increases the ow along each edge of the path by the amount MIN_UPI, not forgetting to reduce by the same amount the ow along the reverse edges). If at some point the flow rate has reached the value K (given to us by the condition of the value stream), then we also stop the algorithm (note that then in the last iteration of the algorithm when increasing the flow along the path need to increase the flow at such a value that the resulting stream is not exceeded K, but it would be easy to implement).</p>
<p>it is Easy to see that if you put K is equal to infinity, then the algorithm finds maximum flow of minimum cost, i.e. the same algorithm without modification solves both problems min-cost flow and min-cost-max-flow.</p>
the <h3>the Case of undirected graphs, multigraphs</h3>
<p>the Case of undirected graphs and multigraphs conceptually no different from the above, therefore the actual algorithm will be run on such graphs. However, there are some difficulties in implementation, which should pay attention.</p>
<p><b>Undirected</b> edge (i,j) is actually two oriented edges (i,j) and (j,i) with the same bandwidth capabilities and costs. Since the above algorithm min-cost-flow requires that for each undirected edges to create a reverse edge, then the result is that an undirected edge is split into 4 oriented edges, and we actually get a case <b>multigraph</b>.</p>
<p>What issues are <b>multiple edges</b>? First, the flow for each of the multiple edges must be maintained separately. Secondly, when finding the shortest path it is necessary to consider that the important thing is what kind of multiple edges to choose from when restoring the path to the ancestors. I.e. instead of the usual array of ancestors for each vertex we need to store the top ancestor and the number of the edge, where we came from. Thirdly, by increasing the ow along some edges need, according to the algorithm to reduce the ow along the reverse edge. Since we may have multiple edges, we have for each edge to keep the ribs return to him.</p>
<p>Other problems with undirected graphs and multigraphs no.</p>
the <h3>Analysis time</h3>
<p>by analogy with the analysis of the algorithm the Edmonds-Karp, we get this assessment: O (N M) * T (N, M), where T (N, M) is the time required for finding shortest path in a graph with N vertices and M edges. If this is implemented using <algohref=dijkstra>the simplest version of Dijkstra's algorithm</algohref>, the whole algorithm min-cost-flow will the score <b>O (N<sup>3</sup> M)</b>, however, the Dijkstra algorithm will have to modify to make it work on graphs with negative weights (this is called Dijkstra's algorithm with potentials).</p>
<p>Instead, use <algohref=levit_algorithm>algorithm Leviticus</algohref>, which, although asymptotically much worse, but in practice works very fast (about the same time as Dijkstra's algorithm).</p>
the <h2>Implementation</h2>
<p>Here is the implementation of the algorithm min-cost-flow-based <algohref=levit_algorithm>algorithm Leviticus</algohref>.</p>
<p>the input To the algorithm serves the network (for an undirected multigraph) with N vertices and M edges, and K is the flow rate that you want to find. The algorithm finds a flow of value K of the minimum cost, if one exists. Otherwise, it finds the maximum flow minimum cost.</p>
<p>there is special function for adding oriented edges. If you want to add an undirected edge, then this function should be called for each edge (i,j) twice, from (i,j) and (j,i).</p>
<code>const int INF = 1000*1000*1000;

struct rib {
int b, u, c, f;
size_t back;
};

void add_rib (vector &lt; vector&lt;rib> > & g, int a, int b, int u, int c) {
rib r1 = { b, u, c, 0, g[b].size() };
rib r2 = { a, 0, c, 0, g[a].size() };
g[a].push_back (r1);
g[b].push_back (r2);
}

int main()
{
int n, m, k;
vector &lt; vector&lt;rib> > g (n);
int s, t;
... reading graph ...

int flow = 0, cost = 0;
while (flow &lt; k) {
vector&lt;int> id (n, 0);
vector&lt;int> d (n, INF);
vector&lt;int> q (n);
vector&lt;int> p (n);
vector < size_t> p_rib (n);
int qh=0, qt=0;
q[qt++] = s;
d[s] = 0;
while (qh != qt) {
int v = q[qh++];
id[v] = 2;
if (qh == n) qh = 0;
for (size_t i=0; i < g[v].size(); ++i) {
rib & r = g[v][i];
if (r.f &lt; r.u && d[v] + r.c &lt; d[r.b]) {
d[r.b] = d[v] + r.c;
if (id[r.b] == 0) {
q[qt++] = r.b;
if (qt = n) qt = 0;
}
else if (id[r.b] == 2) {
if (--q == -1) qh = n-1;
q[qh] = r.b;
}
id[r.b] = 1;
p[r.b] = v;
p_rib[r.b] = i;
}
}
}
if (d[t] == INF) break;
int addflow = k - flow;
for (int v=t; v!=s; v=p[v]) {
int pv = p[v]; size_t pr = p_rib[v];
addflow = min (addflow, g[pv][pr].u - g[pv][pr].f);
}
for (int v=t; v!=s; v=p[v]) {
int pv = p[v]; size_t pr = p_rib[v], r = g[pv][pr].back;
g[pv][pr].f += addflow;
g[v][r].f -= addflow;
cost += g[pv][pr].c * addflow;
}
flow += addflow;
}

... result output ...

}</code>
