\h1{Minimum spanning tree. The Prim's Algorithm}

Given a weighted undirected graph $G$ with $n$ vertices and $m$ edges. You want to find a subtree of this graph which connects all vertices, and thus had the lowest possible weight (i.e. the sum of weights of edges). Subtree is the set of edges connecting all the vertices, and any vertex can reach any other by exactly one simple path.

This subtree is called the minimum spanning tree, or simply \bf{the minimum spanning}. It is easy to understand that any frame will necessarily contain $n-1$ edges.

In \bf{a natural setting} this task is as follows: there are $n$ cities, and for each pair the cost of connecting them expensive (or you may know that connect them). You want to connect all of the city so that you can get from any city to another, and thus the cost of building roads would be minimal.


\h2{the Prim's Algorithm}

This algorithm is named after the American mathematician Robert Prim (Robert Prim), who discovered this algorithm in 1957, However, still in 1930, this algorithm was opened by the Czech mathematician Wojtek Arnica (Vojtěch Jarník). In addition, Edgar Dijkstra (Edsger Dijkstra) in 1959, also invented this algorithm independently.


\h3{algorithm Description}

Himself \bf{algorithm} has a very simple look. The required minimal spanning tree is built progressively by adding to it edges one by one. The skeleton relies initially consisting of a single vertex (it can be selected arbitrarily). Then select the minimum weight edge emanating from this vertex and added to the minimal spanning tree. After that the skeleton already contains two vertices, and now looks for and adds the edge of minimum weight that has one end in one of two selected vertices, and the other-on the contrary, in all but these two. And so on, i.e. every time is searched by the minimum-weight edge with one end --- already taken in the top frame and the other end --- not yet taken, and this edge is added to the skeleton (if there are multiple edges, we can take any). This process is repeated until then, until the skeleton will not contain all the vertices (or, equivalently, $n-1$ edge).

In the end, the skeleton will be constructed which is minimal. If the count was originally not connected, then the skeleton will not be found (the number of selected edges will be less than $n-1$).


\h3{Proof}

Let graph $G$ was connected, i.e. the answer exists. Denote by $T$ the skeleton found by Prim's algorithm, and using $S$ --- minimal spanning tree. It is obvious that $T$ is indeed the backbone (i.e., a subtree of a graph $G$). We show that the weight $S$ and $T$ coincide.

Consider the first time $T$ was adding edges not included in the optimal skeleton of $S$. Let us denote this edge in $e$, the ends of it --- through $a$ and $b$, and the number of inbound at that point in the skeleton vertices - - - $V$ (according to the algorithm, $a \in V$, $b \not\in V$, or Vice versa). In the optimal frame of $S$ vertices $a$ and $b$ are connected by some path $P$; we find in this way any edge of $g$, one end of which lies in $V$, and the other isn't. Since the Prim's algorithm selected the edge $e$ is the edge $g$, it means that the weight of the edges of $g$ greater than or equal to the weight of the edge $e$.

Remove now from $S$ an edge of $g$, and we add an edge $e$. That said, the weight of the skeleton as a result could not increase (decrease, he too could not, since $S$ was optimal). Moreover, $S$ has not ceased to be core (that connectivity is not broken, it is easy to verify: we have closed the path $P$ in the cycle, and then removed from this cycle, one edge).

So, we showed that it is possible to choose the optimal skeleton of $S$ in such a way that it will include the edge $e$. Repeating this procedure as many times as necessary, we obtain that it is possible to choose the optimal frame $S$ to coincide with $T$. Consequently, a weight constructed by Prim's algorithm $T$ is the minimum that we wanted to prove.


\h2{the Implementation}

The algorithm essentially depends on how we search next minimum edge among suitable edges. There may be different approaches leading to different asymptotics and different implementations.


\h3{Trivial implementation: algorithms $O(m n)$ and $O(n^2 + m \log n)$}

If you look for every time edge easy viewing among all possible options, then asymptotically to be viewed $O(m)$ of edges to find among all admissible edge with the least weight. Total asymptotics of the algorithm will be in this case $O(nm)$ in the worst case is $O(n^3)$, --- too slow algorithm.

This algorithm can be improved if you view every time not all edges but only one edge from each already selected vertices. For example, you can sort the edges from each vertex in the ascending order of the weights, and store a pointer to the first valid edge (recall that valid only those edges that lead into a set of all not selected nodes). Then, if you convert these pointers every time you add ribs to the skeleton, the total asymptotic behavior of the algorithm will be $O(n^2 + m)$, but first need to sort all edges $O(m \log n)$ in the worst case (dense graphs) gives the asymptotic $O(n^2 \log n)$.

Below we will consider two slightly other algorithm for dense and for sparse graphs, gaining a noticeably better complexity.


\h3{Case dense graphs: the algorithm for $O(n^2)$}

We come to the question of finding the lowest ribs, on the other hand: for each not yet selected will retain the minimum edge leading in an already selected vertex.

Then, at the current step to produce a minimal edge, you just have to review these minimum edges are not each selected vertex --- the asymptotic behavior of $O(n)$.

But now when you add in the next frame edges, and vertices these pointers need to be recalculated. Note that these pointers can only decrease, i.e., each not yet reviewed the top or leave the pointer unchanged, or to assign an edge weight to the newly added vertex. Therefore, this phase can also be done $O(n)$.

Thus, we got a variant of Prim's algorithm with an asymptotic $O(n^2)$.

In particular, such an implementation is especially useful for solving the so-called \bf{Euclidean minimum frame}: when given $n$ points in the plane, the distance between which is measured by the standard Euclidean metric, and you want to find the skeleton of minimum weight that connects them all (and add new vertices anywhere in other places is prohibited). This problem is solved here is described the algorithm for $O(n^2)$ time and $O(n)$ memory, you will not be able to achieve \algohref=mst_kruskal{algorithm Kruskal}.

Implementation of Prim's algorithm for a graph specified by adjacency matrix $g[][]$:

\code
// the input data
int n;
vector < vector<int> > g;
const int INF = 1000000000; // value of "infinity"

// the algorithm
vector<bool> used (n);
vector<int> min_e (n, INF), sel_e (n, -1);
min_e[0] = 0;
for (int i=0; i<n; ++i) {
int v = -1;
for (int j=0; j<n; j++)
if (!used[j] && (v == -1 || min_e[j] < min_e[v]))
v = j;
if (min_e[v] == INF) {
cout << "No MST!";
exit(0);
}

used[v] = true;
if (sel_e[v] != -1)
cout << v << "" << sel_e[v] << endl;

for (int to=0; to<n; to++)
if (g[v][to] < min_e[to]) {
min_e[to] = g[v][to];
sel_e[to] = v;
}
}
\endcode

The input number of vertices $n$ and the matrix $g[][]$ of size $n \times n$, where the marked edges with weight, and cost number $INF$ if the corresponding edge is absent. The algorithm maintains three arrays: flag ${\rm used}[i] = {\rm true}$ means that vertex $i$ is included in a frame, the value of ${\rm min\_e}[i]$ stores the lowest allowable weight of the edge from vertex $i$ and an element ${\rm sel\_e}[i]$ contains the end of the lowest rib (this is needed for edges in the answer). The algorithm makes $n$ steps, each of which selects a vertex $v$ with the smallest label ${\rm min\_e}$, marks it as $\rm used$, and then loops through all edges from that vertex, counting from the label.


\h3{Case sparse graphs: an algorithm for $O(m \log n)$}

In the algorithm described above can be seen the standard operations of finding the minimum in the set and changing the values in this set. These two operations are a classic, and implemented many data structures, for example, implemented in the language C++ red-black tree set.

The meaning of the algorithm remains the same, but now we can find the minimum edge for a time $O(\log n)$. On the other hand, the time to recount $n$ pointers now will be $O(n \log n)$, which is worse than the above algorithm.

When you consider that only $O(m)$ recalculations pointers and $O(n)$ searches the minimum of edges, the total asymptotic behavior of $O(m \log n)$ --- for sparse graphs it is better than the above algorithm, but for dense graphs this algorithm will be slower than the previous.

Implementation of Prim's algorithm for a graph specified by adjacency lists $g[]$:

\code
// the input data
int n;
vector < vector < pair<int,int> > > g;
const int INF = 1000000000; // value of "infinity"

// the algorithm
vector<int> min_e (n, INF), sel_e (n, -1);
min_e[0] = 0;
set < pair<int,int> > q;
q.insert (make_pair (0, 0));
for (int i=0; i<n; ++i) {
if (q.empty()) {
cout << "No MST!";
exit(0);
}
int v = q.begin()->second;
q.erase (q.begin());

if (sel_e[v] != -1)
cout << v << "" << sel_e[v] << endl;

for (size_t j=0; j<g[v].size(); ++j) {
int to = g[v][j].first,
cost = g[v][j].second;
if (cost < min_e[to]) {
q.erase (make_pair (min_e[to], to));
min_e[to] = cost;
sel_e[to] = v;
q.insert (make_pair (min_e[to], to));
}
}
}
\endcode

The input number of vertices $n$ and $n$ lists adjacency: $g[i]$ is a list of all edges emanating from vertex $i$, in the pairs (the second end of the edge, the edge weight). The algorithm maintains two arrays: the value of ${\rm min\_e}[i]$ stores the lowest allowable weight of the edge from vertex $i$ and an element ${\rm sel\_e}[i]$ contains the end of the lowest rib (this is needed for edges in the answer). It also supports a queue $q$ of all vertices in increasing order of their labels ${\rm min\_e}$. The algorithm makes $n$ steps, each of which selects a vertex $v$ with the smallest label ${\rm min\_e}$ (simply removing it from the queue), and then loops through all edges from that vertex, counting from the label (in the conversion we remove from the queue the old value, and then put back new).


\h3{Analogy with Dijkstra's algorithm}

In just two described algorithms can be traced quite clearly the analogy with \algohref=dijkstra{Dijkstra's algorithm}: it has the same structure ($n-1$ phase, each of which first selects the best edge is added to the answer, and then recalculated the values for all selected vertices). Moreover, Dijkstra's algorithm also has two realizations: for $O(n^2)$ and $O(m \log n)$ (of course, we here do not consider the possibility of using complex data structures to achieve smaller asymptotic).

If you look at the algorithms of Prim and Dijkstra more formally, it turns out that they are generally identical to each other, except \bf{weight function} of vertices: if the Dijkstra's algorithm each vertex is supported by the length of the shortest path (i.e. the sum of the weights of some edges), then the Prim's algorithm each vertex is attributed only minimum weight edges leading to the many already given vertices.

At the implementation level, this means that after adding the vertex $v$ to the set of selected vertices, when we begin to view all edges $(v,to)$ from the vertices, then Prim's algorithm the pointer $to$ is updated with the weight of the edge $(v,to)$, as in Dijkstra's algorithm --- the label of distance $d[to]$ is updated by the sum of the label $d[v]$ and the weight of the edge $(v,to)$. Otherwise, these two algorithms can be considered identical (even though they solve very different problems).


\h2{Properties of minimal skeletons}

\ul{

\li \bf{Maximum} frame also can be searched by Prim's algorithm (for example, replacing all edges with weight at the opposite: the algorithm does not require the nonnegativity of the edge weights).

\li Minimal spanning tree \bf{only}, if all edge weights are different. Otherwise, there may be several minimal skeletons (which will be selected by Prim's algorithm, depends on the order in which edges/vertices with the same weights/pointers)

\li Minimal spanning tree is also a skeleton, \bf{minimal work} all edges (assuming all weights are positive). In fact, if we replace the weights of all edges on their logarithms, it is easy to see that the algorithm will not change anything, and will be found the same ribs.

\li the Minimum frame is a frame with minimal weight \bf{the heavy edge}. Most clearly this statement is clear, if we consider the work \algohref=mst_kruskal{algorithm Kruskal}.

\li \bf{a Criterion of minimality} skeleton: the skeleton is the minimum when and only when for any edge that does not belong to the skeleton, the cycle formed by the edge when added to the skeleton contains no edges heavier than this edge. In fact, if for some ribs, which is easier some of the ribs formed by the cycle, you can get a frame with less weight (by adding this edge to the skeleton, and removing the heaviest edge from the cycle). If this criterion is not met for any edges, these edges do not improve the weight of the frame as you add them.

}

