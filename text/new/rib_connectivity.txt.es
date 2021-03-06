\h1{ Rib connectivity. Properties and finding the }


\h2{ Definition }

Let the given undirected graph $G$ with $n$ vertices and $m$ edges.

\bf{Rib connection} $\lambda$ of a graph $G$ is the smallest number of edges that must be deleted so that the graph was not connected.

For example, for a disconnected graph the connectivity of the rib is equal to zero. For a connected graph with a single bridge rib connectivity equal to one.

They say that the set $S$ of edges \bf{shares} of a vertex $s$ and $t$, if you remove these edges from vertices $u$ and $v$ are in different connected components.

It is clear that the costal connectivity of the graph is equal to the minimum of the smallest number of edges separating two vertices $s$ and $t$, taken among all possible pairs $(s,t)$.


\h2{ Properties }


\h3{ Ratio Whitney }

\bf{Ratio Whitney (Whitney)} (1932) between the rib connectivity $\lambda$, \algohref=vertex_connectivity{vertex-connectivity} of $\kappa$ and smallest degrees of vertices of $\delta$:

$$ \kappa \le \lambda \le \delta. $$

\bf{Prove} this assertion.

We shall first prove the first inequality: $\kappa \le \lambda$. Consider the set of $\lambda$ of edges that makes the graph disconnected. If we take each of these edges one end (either of the two) and remove it from the graph, thus $\le \lambda$ of the deleted vertices (since the same vertex can appear twice) we will make the graph disconnected. Thus, $\kappa \le \lambda$.

Let us prove the second inequality: $\lambda \le \delta$. Consider the vertex of minimum degree, then we can remove all $\delta$ adjacent ribs and thereby separating this peak from the rest of the graph. Therefore, $\lambda \le \delta$.

Interestingly, the inequality Whitney \bf{improving}: i.e., for all triples of numbers that satisfy this inequality, there exists at least one corresponding graph. Cm. task \algohref=connectivity_back_problem{"graph values with the specified vertex and edge connection and smallest degrees of vertices"}.


\h3{ Theorem Ford-Fulkerson }

\bf{Theorem Ford-Fulkerson} (1956):

For any two vertices, the greatest number of edge-disjoint chains connecting them, is equal to the lowest number of edges separating the vertices.


\h2{ the Presence of the rib connectivity }


\h3{ a Simple algorithm based on finding the maximum flow }

This method is based on the theorem of Falerone.

We need to iterate over all pairs of vertices $(s,t)$, and between each pair find the highest number of non-overlapping along the edges of paths. This value can be found using the maximum flow algorithm: we make $s$ source, $t$ --- runoff, and the capacity of each edge is put equal to 1.

Thus, the pseudo-code of the algorithm is as follows:

\code
int ans = INF;
for (int s=0; s<n; s++)
for (int t=s+1; t<n; t++) {
int flow = ... the maximum flow from s to t ...
ans = min (ans, flow);
}
\endcode

The asymptotics of the algorithm when using \edmonds_karp{algorithm Edmonds-Karp find the maximum flow} is $O (n^2 \cdot n m ^2) = O (n^3 m^2)$, however it should be noted that hidden in the asymptotic behavior of the constant is quite small, since it is practically impossible to create such graph, so the algorithm for finding the maximum flow was so slow when all the sinks and sources.

Especially fast this algorithm will work on random graphs.


\h3{ an algorithm }

Using streaming terminology, this problem is the task of finding \bf{global minimum cut}.

For its solution special algorithms are developed. At this site, one of which --- \algohref=stoer_wagner_mincut{algorithm Curtains-Wagner} which works in time $O (n^3)$ or $O (n m)$.



\h2{ Literature }

\ul{

\li Hassler Whitney. \bf{Congruent Graphs and the Connectivity of Graphs} [1932]

\li Frank Harari. \bf{graph Theory} [2003]

}
