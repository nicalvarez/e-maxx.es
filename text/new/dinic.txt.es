
\h1{ Algorithm Dinica }



\h2{ problem Statement }

Let the given network, i.e. a directed graph $G$ where each edge $(u,v)$ is assigned throughput $c_{uv}$, and the two vertices --- source $s$ and sink $t$.

You want to search in this network the flow $f_{uv}$ from a source $s$ to the flow $t$ of the maximum value.



\h2{ a Little history }

This algorithm was published in Soviet (and Israeli) academic Efim \bf{Denizen} (Yefim Dinic, sometimes written as "Dinitz") in 1970, i.e., even two years before the publication of the algorithm the Edmonds-Karp (however, both algorithms were independently discovered in 1968).

In addition, it should be noted that some simplifications of the algorithm were made Even, Shimon (Shimon \bf{Even}) and his disciple Itaí by Alon (Alon \bf{Itai}) in 1979 thanks to them, the algorithm got its present shape: they are used to the idea of Danica the concept of blocking threads Karzanova Alexander (Alexander Karzanov, 1974) and reformulated the algorithm to the combination of breadth and in depth, in which now the algorithm is taught everywhere.

The development of ideas in relation to ow algorithms are extremely interesting to consider, given \bf {iron curtain} of those years that separated the USSR and the West. Shows how sometimes similar ideas had appeared nearly simultaneously (as in the case of Danica algorithm and algorithm the Edmonds-Karp), though with different efficiency (the algorithm Dinica one order of magnitude faster); sometimes, on the contrary, the emergence of the idea on one side of the curtain ahead of a similar move on the other side for more than a decade (as the algorithm Karzanova pushing in 1974 and the algorithm of Goldberg (Goldberg) push in 1985).



\h2{ definition Needed }

We introduce three definitions (each of them is independent from the others), which will then be used in the algorithm Dinica.

\bf{Residual network $G^R$} in relation to the network $G$ and a certain flow $f$ in it is called a network in which each edge $(u,v) \in G$ with capacity $c_{uv}$ and the flux $f_{uv}$ correspond to the two edges:

\ul{

\li $(u,v)$ with capacity $c_{uv}^R = c_{uv} - f_{uv}$

\li $(v,u)$ with capacity $c_{vu}^R = f_{uv}$

}

It should be noted that under this definition in the residual network can appear multiple edges: if the original network was like an edge $(u,v)$ and $(v,u)$.

Residual edge can intuitively be understood as a measure of how still you can increase the ow along some edges. In fact, if the edge $(u,v)$ with capacity $c_{uv}$ is the flux of $f_{uv}$, then potentially you can skip another $c_{uv}-f_{uv}$ flow units, and in the opposite direction, you can skip to $f_{uv}$ units of flux that cancels the flux in the original direction.

\bf{a Blocking stream} in the network is called such flux that any path from source $s$ to the flow $t$ contains rich this stream edge. In other words, in this network there is no such path from the source to the sink along which it is possible freely to increase the flow.

A blocking flow is not necessarily maximum. Theorem Ford-Fulkerson suggests that the flow is maximum if and only if the residual network does not exists $s-t$ path; blocking the flow nothing is affirmed about the existence of paths along edges that appear in the residual network.

\bf{Layered network} for a given network is constructed as follows. First, we determine the length of the shortest paths from the source $s$ to every other vertex; call it ${\rm level}[v]$ of a vertex its distance from the source. Then in a layered network include all those edges $(u,v)$ of the original network that lead from one level to another, later level, i.e. ${\rm level}[u] + 1 = {\rm level}[v]$ (why in this case the difference of the distances cannot exceed unity, it follows from properties of shortest distances). Thus, all edges are removed that are located entirely within the levels and edges leading back to the previous levels.

Obviously, a layered acyclic network. In addition, any $s-t$ path in a layered network is the shortest path in the original network.

To build a layered network, the network is very easy: you need to run a breadth-first search along edges of the network, arguing thus for each vertex the value of ${\rm level}[]$, and then add in a layered network of all matching edges.

Note. The term "layered network" in Russian literature is not used; usually this is just "support count". However, English usually uses the term "layered network".



\h2{ Algorithm }


\h3{ algorithm }

The algorithm consists of several \bf{phase}. At each phase first we construct the residual network, then in relation to it is constructed a layered network (BFS), and it is searched for an arbitrary blocking the flow. Found blocking the flow is added to the current thread, and the iteration ends.

This algorithm is similar to the algorithm of Edmonds-Karp, but the main difference can be understood as follows: at each iteration, the stream is not along one of the shortest $s-t$ path, and along a set of such paths (because it is in the way and are the way in blocking the flow of the layered network).


\h3{ Correctness of algorithm }

We show that if the algorithm terminates, then output it produces a flow of maximum value.

In fact, suppose that at some point in a layered network built for the residual network, failed to find a blocking flow. This means that the flow $t$ is generally not achievable in a layered network from the source $s$. But because of the layered network contains all shortest paths from the source in the residual network, this in turn means that in the residual network there is no path from the source to the drain. Therefore, applying theorem Ford-Fulkerson, we get that the current thread is in fact a maximum.


\h3{ estimation of the number of phases }

We will show that the algorithm always performs Dinica \bf{less than $n$ phase}. For this we will prove two lemmas:

\bf{Lemma 1}. The shortest distance from the source to each vertex never decreases with each iteration, i.e.

$$ {\rm level}_{i+1}[v] \ge {\rm level}_i[v] $$

where the lower index denotes the number of phases, which are taken before the values of these variables.

\bf{the Proof}. Fix an arbitrary phase $i$ and an arbitrary vertex $v$ and consider any shortest $s-v$ a path $P$ on the network $G^R_{i+1}$ (recall, we denote the residual network, taken before executing $i+1$-th phase). Obviously, the length of a path $P$ is $ ${\rm level}_{i+1}[v]$.

Note that in the residual network $G^R_{i+1}$ can include only edges from $G^R$, and edges, return edges from $G^R$ (this follows from the denition of the residual network). We consider two cases:

\ul{
\li the Path $P$ contains only edges from $G^R$. Then, of course, the length of a path $P$ greater than or equal to ${\rm level}_i[v]$ (because ${\rm level}_i[v]$ is by definition the length of the shortest path), which means the inequality.
\li the Path $P$ contains at least one edge not contained in $G^R$ (but reverse any edge from $G^R$). Consider the first such edge; let it be an edge $(u,w)$.

$$ s \Longrightarrow u \rightarrow w \Longrightarrow v $$

We can apply our Lemma to the vertex $u$, because it falls under the first case; so we get the inequality ${\rm level}_{i+1}[u] \ge {\rm level}_i[u]$.

Now note that because the edge $(u,w)$ has appeared in a residual network only after completing the $i$-th phase, it follows that, along the edge $(w,u)$ was additionally skipped some flow; therefore, the edge $(w,u)$ belonged to the layered network in front of the $i$-th phase, and therefore ${\rm level}_i[u] = {\rm level}_i[w] + 1$. Consider that on a property of shortest paths ${\rm level}_{i+1}[w] = {\rm level}_{i+1}[u] + 1$, and combining this equality with the previous two inequalities, we get:

$$ {\rm level}_{i+1}[w] \ge {\rm level}_i[w] + 2. $$

Now we can apply the same reasoning to all the rest of the path to $v$ (i.e., each inverted rib adds to $\rm level$ at least two), and eventually obtain the desired inequality.

}

\bf{Lemma 2}. The distance between the source and drain strictly increases after each phase of the algorithm, i.e.:

$$ {\rm level}^\prime[t] > {\rm level}[t] $$

where the bar marked with the value obtained in the next phase of the algorithm.

\bf{the Proof}: by contradiction. Suppose that after the execution of the current phase it turned out that $ {\rm level}^\prime[t] = {\rm level}[t] $. Consider a shortest path from the source to the drain; by assumption, its length must remain unchanged. However, the residual network for the next phase contains only the edges of the residual network before performing the current phase or return to them. Thus, a contradiction: found $s-t$ path that contains no saturated edges, and has the same length as the shortest path. This path should be blocked by the blocking thread, which never happened, and this is the contradiction that we wanted to prove.

This Lemma can be intuitively understood as follows: the $i$-th phase, the algorithm identifies Dinica and saturates all $s-t$ paths of length $i$.

Since the length of the shortest path from $s$ to $t$ cannot exceed $n-1$, then the algorithm Danica does \bf{not more than $n-1$ phases}.


\h3{ Search-blocking stream }

To complete the construction of the algorithm Dinica, it is necessary to describe the algorithm for finding a blocking flow in a layered network --- key algorithm.

We will consider three possible options for the implementation of finding a blocking flow:

\ul{

\li to Find $s-t$ paths one by one until those paths are. The path can be found in $O(m)$ with depth-first-search, and total number of such paths is $O(m)$ (since each path saturates at least one edge). The complexity of finding a blocking flow is $O(m^2)$.

\li Similar to the previous idea, however, to remove in the process of depth-first-search graph from all the unnecessary edges, i.e. edges along which fail to reach the drain.

It is very easy to implement: it is sufficient to remove a rib after we have reviewed it in depth (except when we were along the edge and found a path to flow). From the point of view of implementation, we just need to keep the adjacency list of each vertex a pointer to the first undeleted edge, and to increase this to specify in a loop inside of DFS.

Evaluate the asymptotics of this solution. Each depth is either the saturation of the at least one rib (if this traversal has reached the drain), or advancing at least one pointer (otherwise). You can understand that a single run of DFS from the main program runs at $O (k + n)$, where $k$ is the number of promotions pointers. Given that all runs of depth-first-search within search of one of the blocking flow is $O (p)$, where $p$ the number of edges saturated by this locking thread, then the entire search algorithm of the blocking thread will work for $O (p k + p n)$ that, given that all the signs in the sum of passed distance of $O (m)$, gives the asymptotic $O (m + pn)$. In the worst case, when blocking the flow saturates all edges, asymptotics obtained $O (n m)$; this asymptotics will be used next.

We can say that this method of finding a blocking flow is extremely effective in the sense that to find the one which increases the way, he spends $O (n)$ operations on average. Therein lies the difference by one order of efficiencies of Danica algorithm and Edmonds-Karp (which looks for increasing one way for $O (m)$).

This solution is still simple to implement, but quite efficient, and therefore most often used in practice.

\li you Can apply a custom data structure --- Slator dynamic trees (Sleator) and Tarjan (Tarjan)). Then each blocking flow can be found in time $O (m \log n)$.

}


\h3{ Asymptotics }

Thus, the whole algorithm runs for Dinica $O (n^2 m)$ if the blocking thread to find the above method $O (n m)$. Implementation using dynamic trees Slator and Tarjan will work within time $O (n m \log n)$.

\h4{ Single network }

Single network ("network unit") is such a network in which the bandwidth of all available edges is equal to the unit, and any node except the source and drain, either incoming or outgoing edge only.

This case is quite important since in the problem search \bf{maximum matchings} constructed network is isolated.

\bf{Prove} that on isolated networks algorithm Dinica even in a simple implementation (which works on arbitrary graphs $O (n^2 m)$) is $O (m \sqrt{n})$, achieving the greatest task of finding matchings is one of the best known algorithms --- algorithm of Hopcroft-Karp.

First, note that the above algorithm for finding a blocking flow, which on arbitrary networks works in time $O (n m)$, in networks with individual bandwidth capabilities will work for $O (m)$: because each edge may not be accessed more than once.

Secondly, estimate the total number of phases which might occur in the case of a single network.

Though it was produced by $\sqrt{n}$ phase of the algorithm Dinica; and all the increasing paths of length at most $\sqrt{n}$ are already found. Let $f$ --- current flow was found, and $f^*$ --- desired maximum flow; let us consider their difference: $f^* f$. It is a flow in the residual network $G^R$. This thread has the magnitude $|f^*| - |f|$, and along each edge is zero or one. It is possible to decompose the set of $|f^*| - |f|$ of paths from $s$ to $t$ and possibly cycles. Because the network is isolated, then all these paths cannot have common vertices, so given the above, the total number of vertices in $cnt$ can be estimated as:

$$ cnt \ge (|f^*| - |f|) \cdot \sqrt{n}. $$

On the other hand, given that $cnt \le n$, we get from here:

$$ |f^*| - |f| \le \sqrt{n}, $$

that means that after $\sqrt{n}$ phases of Danica algorithm is guaranteed to find the maximum flow.

Consequently, the total number of phases of the algorithm Dinica performed on isolated networks, can be estimated as $2 \sqrt{n}$, what we wanted to prove.



\h2{ the Implementation }

We will give two implementations of the algorithm for $O (n^2 m)$, working in the networks specified by an adjacency matrix and adjacency lists, respectively.


\h3{ Implementation over graphs as matrices the adjacency }

\code
const int MAXN = ...; // number of vertices
const int INF = 1000000000; // constant value-infinity

int n, c[MAXN][MAXN], f[MAXN][MAXN], s, t, d[MAXN], ptr[MAXN], q[MAXN];

bool bfs() {
int qh=0, qt=0;
q[qt++] = s;
memset (d, -1, n * sizeof d[0]);
d[s] = 0;
while (qh < qt) {
int v = q[qh++];
for (int to=0; to<n; to++)
if (d[to] == -1 && f[v][to] < c[v][to]) {
q[qt++] = to;
d[to] = d[v] + 1;
}
}
return d[t] != -1;
}

int dfs (int v, int flow) {
if (!flow) return 0;
if (v == t) return flow;
for (int & to=ptr[v]; to<n; to++) {
if (d[to] != d[v] + 1) continue;
int pushed = dfs (to, min (flow, c[v][to] - f[v][to]));
if (pushed) {
f[v][to] += pushed;
f[to][v] -= pushed;
return pushed;
}
}
return 0;
}

int dinic() {
int flow = 0;
for (;;) {
if (!bfs()) break;
memset (ptr, 0, n * sizeof ptr[0]);
while (int pushed = dfs (s, INF))
flow += pushed;
}
return flow;
}
\endcode

The network must be previously read: should be set to the variables $n$, $s$, $t$, and also read the matrix of the capacity $c[][]$. The main function of the decision --- $\rm dinic ()$ that returns the value of the maximum flow.


\h3{ Implementation over graphs as adjacency lists }

\code
const int MAXN = ...; // number of vertices
const int INF = 1000000000; // constant value-infinity

struct edge {
int a, b, cap, flow;
};

int n, s, t, d[MAXN], ptr[MAXN], q[MAXN];
vector<edge> e;
vector<int> g[MAXN];

void add_edge (int a, int b, int cap) {
edge e1 = { a, b, cap, 0 };
edge e2 = { b, a, 0, 0 };
g[a].push_back ((int) e.size());
e.push_back (e1);
g[b].push_back ((int) e.size());
e.push_back (e2);
}

bool bfs() {
int qh=0, qt=0;
q[qt++] = s;
memset (d, -1, n * sizeof d[0]);
d[s] = 0;
while (qh < qt && d[t] == -1) {
 int v = q[qh++];
for (size_t i=0; i<g[v].size(); ++i) {
int id = g[v][i],
to = e[id].b;
if (d[to] == -1 && e[id].flow < e[id].cap) {
q[qt++] = to;
d[to] = d[v] + 1;
}
}
}
return d[t] != -1;
}

int dfs (int v, int flow) {
if (!flow) return 0;
if (v == t) return flow;
for (; ptr[v]<(int)g[v].size(); ++ptr[v]) {
int id = g[v][ptr[v]],
to = e[id].b;
if (d[to] != d[v] + 1) continue;
int pushed = dfs (to, min (flow, e[id].cap - e[id].flow));
if (pushed) {
e[id].flow += pushed;
e[id^1].flow -= pushed;
return pushed;
}
}
return 0;
}

int dinic() {
int flow = 0;
for (;;) {
if (!bfs()) break;
memset (ptr, 0, n * sizeof ptr[0]);
while (int pushed = dfs (s, INF))
flow += pushed;
}
return flow;
}
\endcode

The network must be previously read: should be set to the variables $n$, $s$, $t$, and add all edges (oriented) with calls to functions $\rm add\_edge$. The main function of the decision --- $\rm dinic ()$ that returns the value of the maximum flow.


