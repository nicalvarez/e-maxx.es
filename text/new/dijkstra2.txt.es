\h1{Finding shortest paths from a given vertex to all other vertices by Dijkstra's algorithm for sparse graphs}

Statement of the problem, the algorithm and its proof, see \algohref=dijkstra{basic Dijkstra's algorithm}.

\h2{Algorithm}

Recall that the complexity of the Dijkstra algorithm includes two main operations: the time for finding the vertex with the smallest value of the distance $d[v]$, and the time of the relaxation, i.e. the time of change of size $d[to]$.

In the simplest implementation these operations will require $O(n)$ and $O(1)$ time. Given that only the first operation is $O(n)$ times and the second one --- $O(m)$, we obtain the asymptotics for the simplest implementation of the Dijkstra algorithm: $O(n^2+m)$.

It is clear that this asymptotics is optimal for dense graphs, i.e., when $m \approx n^2$. The more tenuous the count (i.e., less than $m$ compared to the maximum number of edges $n^2$), the less optimal it becomes this assessment, and the fault of the first addend. Thus, it is necessary to improve the operations of the first type, not severely compromising the operations of the second type.

For this we need to use different auxiliary data structures. The most attractive are the \bf{Fibonacci heap}, which allow the operation of the first type for $O(\log n)$ and the second $O(1)$. Therefore, when using Fibonacci heaps the running time of Dijkstra's algorithm is $O(n \log n + m)$, which is almost the theoretical minimum for the algorithm to find the shortest path. Incidentally, this estimate is optimal for algorithms based on Dijkstra's algorithm, i.e. Fibonacci heaps are optimal from this point of view (this is the claim of optimality is actually based on the impossibility of the existence of such "ideal" data structures --- if it did exist, it would be possible to sort in linear time, which, as we know, is not generally possible; however, it is interesting that there is Toropa algorithm (Thorup), which looks for the shortest path with optimal, linear, asymptotic, but it is based on quite different idea than the Dijkstra algorithm, so no contradiction here). However, Fibonacci heap quite difficult to implement (and, it should be noted, have a considerable constant hidden in the asymptotic expansion).

As a compromise, you can use data structures that allow you to perform \bf{both types of operations} (actually, this extracts the minimum and the upgrade item) for $O(\log n)$. Then the Dijkstra's algorithm will be:
$$ O(n \log n + m \log n) = O (m \log n) $$

As such data structures to C++ programmers is convenient to take the standard container $\rm set$ or $\rm priority\_queue$. The first one is based on red-black tree, the second on a binary heap. Therefore $\rm priority\_queue$ has a lower constant hidden in asimptotike, but it has the disadvantage that it does not support the delete operation element, which is why we have to do a workaround, which actually leads to the substitution of the asymptotics in $\log n$ for $\log m$ (from the point of view of asymptotics, it actually changes nothing, but the hidden constant increases).

\h2{the Implementation}

\h3{set}

Let's start with the container $\rm set$. Since the container we need to store the vertices sorted by their values $d[]$, it is convenient to the container to place pairs: the first element of a pair --- the distance and the second-is the node number. As a result in $\rm set$ will be stored pairs are automatically ordered according to the distances that we need.

\code
const int INF = 1000000000;

int main() {
int n;
... read n ...
vector < vector < pair<int,int> > > g (n);
... reading graph ...
int s = ...; // starting vertex

vector<int> d (n, INF), p (n);
d[s] = 0;
set < pair<int,int> > q;
q.insert (make_pair (d[s], s));
while (!q.empty()) {
int v = q.begin()->second;
q.erase (q.begin());

for (size_t j=0; j<g[v].size(); ++j) {
int to = g[v][j].first,
len = g[v][j].second;
if (d[v] + len < d[to]) {
q.erase (make_pair (d[to], to));
d[to] = d[v] + len;
p[to] = v;
q.insert (make_pair (d[to], to));
}
}
}
}
\endcode

Unlike conventional Dijkstra's algorithm becomes unnecessary array $u[]$. Its role and function finding the vertex with the smallest distance, executes $\rm set$. Initially it put the starting vertex $s$ to its distance. The main loop of the algorithm executes until the queue has at least one vertex. Is taken from the queue the node with the smallest distance, and then run it from the relaxation. Before performing each successful relaxation, we first remove from $\rm set$ old couple, and then, after relaxation, you add back a new pair (with a new distance $d[to]$).

\h3{priority_queue}

Here is fundamentally different from the $\rm set$ no, except for that fact that it is remove from $\rm priority\_queue$ arbitrary elements impossible (although theoretically pile support this operation, in the standard library it is not implemented). So you have to make a workaround: when the relaxation just won't remove the old pair from the queue. As a result, in may be multiple pairs for the same vertex (but with different distances). Among these pairs we are interested in only one for which the element $\rm first$ is $ $d[v]$, and all the others are fictitious. Therefore, it is necessary to make a small modification: at the beginning of each iteration, when we extract from the queue the next couple, will check, fake or not (it is enough to compare $\rm first$ and $d[v]$). It should be noted that this is an important modification: if you don't make it, it will lead to a significant deterioration of the asymptotics (up to $O(nm)$).

Still need to remember that $\rm priority\_queue$ sorts the elements in descending order instead of ascending, as usual. Easiest way to overcome this feature of not showing your comparison operator, and just putting as elements of $\rm first$ distance with a minus sign. As a result, in the root of the heap will be the elements with the lowest distance that we need.

\code
const int INF = 1000000000;

int main() {
int n;
... read n ...
vector < vector < pair<int,int> > > g (n);
... reading graph ...
int s = ...; // starting vertex

vector<int> d (n, INF), p (n);
d[s] = 0;
priority_queue < pair<int,int> > q;
q.push (make_pair (0, s));
while (!q.empty()) {
int v = q.top().second, cur_d = -q.top().first;
q.pop();
if (cur_d > d[v]) continue;

for (size_t j=0; j<g[v].size(); ++j) {
int to = g[v][j].first,
len = g[v][j].second;
if (d[v] + len < d[to]) {
d[to] = d[v] + len;
p[to] = v;
q.push (make_pair (-d[to], to));
}
}
}
}
\endcode

As a rule, in practice the version with $\rm priority\_queue$ is somewhat faster than the version with $\rm set$.

\h3{Deliverance from pair}

You can still slightly improve the performance, if the containers to store pairs, and only the numbers of the nodes. Thus, clearly, it is necessary to overload a comparison operator for vertices: any two vertices have the distance $d[]$.

As a result of relaxation the distance to some vertex changes, it should be understood that in itself the data structure is not rebuilt. Therefore, although it may seem that add/delete elements to the container during the relaxation process is not necessary, it will lead to the destruction of the data structure. Still before relaxation need to remove from the data structure a vertex $\rm to$ and after relaxation then paste it back --- then no correlation between the elements of the data structure is not disturbed.

And since removing elements from $\rm set$ but not in $\rm priority\_queue$, it turns out that this technique applies only to $\rm set$. In practice, it noticeably improves performance, especially when storage distances uses large data types (as $\rm long\ long$ or $\rm double$).
