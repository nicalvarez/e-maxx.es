\h1{ construct a graph with these values vertex and edge connection and smallest degrees of vertices }

Given the magnitude of $\kappa$, $\lambda$, $\delta$ is, respectively, \algohref=vertex_connectivity{vertex-connectivity}, \algohref=rib_connectivity{rib connectivity} and the smallest of the degrees of the vertices of the graph. You want to build a graph that had the specified values, or to say that such a graph does not exist.


\h2{ the Ratio of Whitney }

\bf{Ratio Whitney (Whitney)} (1932) between \algohref=rib_connectivity{rib connection} $\lambda$, \algohref=vertex_connectivity{vertex-connectivity} of $\kappa$ and smallest degrees of vertices of $\delta$:

$$ \kappa \le \lambda \le \delta. $$

\bf{Prove} this assertion.

We shall first prove the first inequality: $\kappa \le \lambda$. Consider the set of $\lambda$ of edges that makes the graph disconnected. If we take each of these edges one end (either of the two) and remove it from the graph, thus $\le \lambda$ of the deleted vertices (since the same vertex can appear twice) we will make the graph disconnected. Thus, $\kappa \le \lambda$.

Let us prove the second inequality: $\lambda \le \delta$. Consider the vertex of minimum degree, then we can remove all $\delta$ adjacent ribs and thereby separating this peak from the rest of the graph. Therefore, $\lambda \le \delta$.

Interestingly, the inequality Whitney \bf{improving}: i.e., for all triples of numbers that satisfy this inequality, there exists at least one corresponding graph. We'll prove this constructively by showing how to construct appropriate graphs.


\h2{ Solution }

Check whether the given numbers $\kappa$, $\lambda$ and $\delta$ the ratio of Whitney. If not, then there is no answer.

Otherwise, construct the graph itself. It will consist of $2 (\delta + 1)$ vertices, with the first $\delta + 1$ vertices form a fully connected subgraph, and the second $\delta + 1$ vertices also form a fully connected subgraph. In addition, connect these two parts of $\lambda$ edges so that in the first part of these ribs had adjoining $\lambda$ of the vertex, and the other parts --- $\kappa$ vertices. It is easy to verify that the resulting graph will have the required characteristics.
