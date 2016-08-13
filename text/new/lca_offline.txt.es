\<h1>Maximum flow using the Edmonds-Karp O (N M<sup>2</sup>)</h1>

<p style="color:red">note: this article is outdated and contains errors and not recommended reading. After some time the article will be completely rewritten.</p>

<p>Suppose we are given a graph G, where two vertices: the source S and the sink T, and each edge defined bandwidth C<sub>u,v</sub>. The stream F can be represented as a flow of matter that could pass through the network from the source to the drain, if we consider the graph as a network of pipes with certain bandwidth capabilities. I.e. the flux - function F<sub>u, v</sub>, defined on the set of edges of the graph.</p>
<p>&nbsp;</p>
<p>the Challenge is in finding the maximum flow. Here will be described the method of the Edmonds-Karp running time O (N M<sup>2</sup>), or (another estimate) O (F M), where F is the magnitude of the desired flow. The algorithm was developed in 1972.</p>
the <h2>the Algorithm</h2>
<p><b>Residual bandwidth</b> is called the bandwidth of the edge minus the current ow along that edge. It should be remembered that if some thread runs through oriented rib, a so-called reverse edge (directed in the opposite direction), which will have a bandwidth of zero, and which will flow the same largest stream, but with a minus sign. If the edge was undirected, then it splits into two oriented edges with the same bandwidth, and each of these edges is the reverse for the other (if one flows a flow F, then another runs a -F).</p>
<p>the General scheme of the <b>algorithm the Edmonds-Karp</b> is as follows. First believe the flux is zero. Then looking for a complementary way, i.e. a simple path from S to T by those edges whose residual bandwidth is strictly positive. If the complementary path has been found, increase the current ow along this path. If the path was not found, then the current flow is maximum. To search for complementary ways can be used as <algohref=bfs>BFS</algohref> and <algohref=dfs>DFS</algohref>.</p>
<p>let us Consider more precisely the procedure for increasing the flow of. May we find some complementary way, then let C be the smallest of the residual capacities of edges of this path. The procedure of increasing the flow is as follows: for each edge (u, v) complementary ways perform: F<sub>u, v</sub> += C, and F<sub>v, u</sub> = F<sub>u, v</sub> (or, equivalently, F<sub>v, u</sub> = C).</p>
<p>the flow rate will be the sum of all non-negative values of F<sub>S, v</sub>, where v is any vertex connected to the source.</p>
the <h2>Implementation</h2>
<code>const int inf = 1000*1000*1000;


typedef vector&lt;int> graf_line;
typedef vector&lt;graf_line> graf;

typedef vector&lt;int> vint;
typedef vector < vint> vvint;


int main()
{
int n;
cin >> n;
vvint c (n, vint(n));
for (int i=0; i&lt;n; i++)
for (int j=0; j&lt;n; j++)
cin >> c[i][j];
// source is vertex 0, the drain is the top n-1

vvint f (n, vint(n));
for (;;)
{

vint from (n, -1);
vint q (n);
int h=0, t=0;
q[t++] = 0;
from[0] = 0;
for (int cur; h&lt;t;)
{
cur = q[h++];
for (int v=0; v < n; v++)
if (from[v] == -1 &&
c[cur][v]-f[cur][v] > 0)
{
q[t++] = v;
from[v] = cur;
}
}

if (from[n-1] == -1)
break;
int cf = inf;
for (int cur=n-1; cur!=0; )
{
int prev = from[cur];
cf = min (cf, c[prev][cur]-f[prev][cur]);
cur = prev;
}

for (int cur=n-1; cur!=0; )
{
int prev = from[cur];
f[prev][cur] += cf;
f[cur][prev] -= cf;
cur = prev;
}

}

int flow = 0;
for (int i=0; i&lt;n; i++)
if (c[0][i])
flow += f[0][i];

cout &lt;&lt; flow;

}</code>h1{Least common ancestor. Finding $O(1)$ in the offline (the algorithm of Tarjan)}

Given a tree $G$ with $n$ vertices and given $m$ queries of the form $(a_i, b_i)$. For each request $(a_i, b_i)$ is required to find the least common ancestor of vertices $a_i$ and $b_i$, i.e. this node $c_i$, which is farthest from the root of the tree, and thus is an ancestor of both vertices $a_i$ and $b_i$.

We consider the problem in offline mode, i.e. considering that all requests are known in advance. Described below is an algorithm to answer $m$ of queries over the total time $O(n+m)$, i.e., for sufficiently large $m$ at $O(1)$ on the query.

\h2{the Algorithm of Tarjan}

The basis for the algorithm is the data structure \algohref=dsu{"DSU"}, which was invented by Tarjan (Tarjan).

The algorithm is essentially a depth-first-search from the root of the tree, which gradually are the answers to the queries. Namely, the answer to the query $(v,u)$ is found when the depth is at the vertex $u$, and vertex $v$ has already been visited, or Vice versa.

So, let the depth-first-search is the vertex $v$ (and already have been executed transitions in her sons), and found that for some of request $(v,u)$ the vertex $u$ has already been visited by the DFS. Learn then to find $\rm LCA$ these two vertices.

Note that ${\rm LCA}(v,u)$ is either the vertex $v$ or one of its ancestors. Then, we need to find the lowest top among the ancestors of $v$ (including herself), for which the vertex $u$ is a descendant. Note that for a fixed $v$ on such grounds (i.e. what is the lowest ancestor $v$ is an ancestor of some vertex) of vertices of the tree split into a set of disjoint classes. For each ancestor $p \not= v$ vertices $v$ the class itself contains this vertex and all subtrees with roots in those of her sons that are left from the path to $v$ (i.e., who were treated earlier than was achieved for $v$).

We need to learn to effectively support all of these classes, for which we apply the data structure "DSU". Each class will fit in this structure a lot, and for a representative of this set, we Dene the value $\rm ANCESTOR$ --- the vertex $p$, which forms this class.

Let's discuss the implementation of DFS. Let us assume that a vertex $v$. Place it in a separate class in the structure of disjoint sets, ${\rm ANCESTOR}[v] = v$. As usual in a depth-first, iterate over all outgoing edges $(v, to)$. For each such $to$ we first need to call the DFS from this vertex and add the vertex with all its subtree in the class of vertex $v$. It is implemented by the operation $\rm Union$ data structures "DSU", with the subsequent installation of ${\rm ANCESTOR} = v$ for the representative set (because after the merge, the representative of the class could change). Finally, after processing all edges we iterate over all requests of the form $(v,u)$, and if $u$ has been marked as visited by DFS, then the answer to this query will be the peak ${\rm LCA}(v,u) = {\rm ANCESTOR}[{\rm FindSet}(u)]$. It is easy to see that for each request this condition (which is one vertex of the query is current, and the other was previously visited) is executed exactly once.

Rate \bf{asymptotics}. It is composed of several parts. First, it is the asymptotic behavior of depth-first-search, which in this case is $O(n)$. Second, are the operations of Union of sets, which in the reasonable amount for all $n$ spend $O(n)$ operations. Thirdly, for each request the verification of conditions (twice in the query) and determining the outcome (once per query), each, again, all for a reasonable $n$ is $O(1)$. The complexity is obtained to $O(n+m)$, which means that for sufficiently large $m$ ($n = O(m)$) the answer for $O(1)$ per query.

\h2{the Implementation}

We present the complete implementation of this algorithm, including a slightly modified (with the support of $\rm ANCESTOR$) the implementation of a system of intersecting sets of (randomized version).

\code
const int MAXN = maximum number of vertices in the graph;
vector<int> g[MAXN], q[MAXN]; // count all requests
dsu int[MAXN], ancestor[MAXN];
bool u[MAXN];

dsu_get int (int v) {
return v == dsu[v] ? v : dsu[v] = dsu_get (dsu[v]);
}

void dsu_unite (int a, int b, int new_ancestor) {
a = dsu_get (a), b = dsu_get (b);
if (rand() & 1) swap (a, b);
dsu[a] = b, ancestor[b] = new_ancestor;
}

void dfs (int v) {
dsu[v] = v, ancestor[v] = v;
u[v] = true;
for (size_t i=0; i<g[v].size(); ++i)
if (!u[g[v][i]]) {
dfs (g[v][i]);
dsu_unite (v, g[v][i], v);
}
for (size_t i=0; i<q[v].size(); ++i)
if (u[q[v][i]]) {
printf ("%d %d -> %d\n", v+1, q[v][i]+1,
ancestor[ dsu_get(q[v][i]) ]+1);
}

int main() {
... reading graph ...

// read query
for (;;) {
int a, b = ...; // another request
--a, --b;
q[a].push_back (b);
q[b].push_back (a);
}

// depth-first-search and response to requests
dfs (0);
}
\endcode
