
\h1{Search bridges online}

Let the given undirected graph. The bridge is such an edge, the removal of which makes the graph disconnected (or, more precisely, increases the number of connected components). You want to find all bridges in a given graph.

Informally, this problem is formulated as follows: you want to find on a given map of the roads all the "important" roads, i.e. roads that removing any of them will lead to the disappearance of the path between any pair of cities.

The algorithm described here is \bf{online}, which means that the input graph is not known in advance, and edges are added one by one and after each addition the algorithm recalculates all the bridges in the current graph. In other words, the algorithm is designed to work effectively in a dynamic, changing field.

More strictly, \bf{problem statement} this. Initially the graph is empty and consists of $n$ vertices. Then come the requests, each of which is a pair of vertices $(a,b)$, which denote the edge added to the graph. Required after each request, i.e. after adding each edge, output current number of bridges in the graph. (If desired, can be maintained and a list of all the edge bridges, as well as explicitly to support the components of the rib dvuhsvetnoe.)

As described below, the algorithm works in time $O (n \log n + m)$, where $m$ --- the number of requests. The algorithm is based on \algohref=dsu{data structure "DSU"}.

Shows the implementation of the algorithm, however, works in time $O (n \log n + m \log n)$, because it uses in one place a simplified version of \algohref=dsu{disjoint set Union} without ranking heuristics.


\h2{Algorithm}

It is known that the edge bridges divide the vertices of the graph into components, called features ribs dvuhsvetnoe. If each component of the rib dvuhsvetnoe squeeze in one vertex, and to leave only the edge bridges between these components, the result is acyclic, i.e. a forest.

As described below, the algorithm maintains explicitly that \bf{forest component of the rib dvuhsvetnoe}.

It is clear that initially when the graph is empty, it contains $n$ component of the rib dvuhsvetnoe not connected in any way among themselves.

When you add another edge $(a,b)$ can occur three situations:

\ul{

\li Both ends $a$ and $b$ are in the same component of the rib dvuhsvetnoe --- then this edge is not a bridge, and changes nothing in the structure of the forest, so just skip this edge.

Thus, in this case, the number of bridges does not change.

\li the Vertices $a$ and $b$ are in different connected components, i.e., connect the two trees. In this case, the edge $(a,b)$ becomes the new bridge, and these two trees are combined into one (but all the old bridges remain).

Thus, in this case, the number of bridges increased by one.

\li the Vertices $a$ and $b$ are in one connected component, but in different components of the rib dvuhsvetnoe. In this case, this edge forms a cycle together with some of the old bridges. All these bridges cease to be bridges, and the formed cycle should be combined into a new component, the rib dvuhsvetnoe.

Thus, in this case, the number of bridges decreases by two or more.

}

Therefore, the whole problem is reduced to the effective implementation of all these operations over the forest component.

\h3{data Structures for storage of wood}

All we need from data structures, is the \algohref=dsu{DSU}. Actually, we need to make two copies of this structure: one is to maintain \bf{connected components}, the other is to maintain \bf{component ribs dvuhsvetnoe}.

In addition, storage patterns of trees in the forest component of dvuhsvetnoe for each vertex we store a pointer to ${\rm par}[]$ to its ancestor in the tree.

We will now successively be disassembled every operation that we need to learn to implement:

\ul{

\li \bf{Check, are whether two specified vertices in one connected component/dvuhsvetnoe}. The usual request is made to the structure of "the DSU".

\li \bf{merging of two trees into one} for some edge $(a,b)$. Because it could turn out that neither the vertex $a$, any vertex $b$ are not roots of their trees, the only way to connect these two trees --- \bf{periodicity} one of them. For example, periodicity one tree at vertex $a$, and then attach it to another tree, making a vertex $a$ child to $b$.

However, the question arises about the effectiveness of the operation of perepodpisanie: periodicity to the tree with root $r$ for a vertex $v$, you have to pass the path from $v$ in $r$, redirecting pointers ${\rm par}[]$ in the opposite direction, as well as changing the references to an ancestor in the DSU responsible for connected components.

Thus, the operation cost of perepodpisanie is $O(h)$, where $h$ is the height of the tree. You may rate it even higher, saying it has the size $O({\rm size})$, where $\rm size$ --- the number of vertices in the tree.

Now apply this standard trick: we say that two trees \bf{pereozvuchivat will be the one in which fewer of the vertices}. Then it is intuitively clear that the worst case --- when you combine two trees of approximately equal size, but then the result is a tree of double the size, which makes this situation happen many times. Formally this can be written as recurrence relations:

$$ T(n) = \max_{k = 1 \ldots n-1} \left\{ ~ T(k) + T(n-k) + O(n) ~ \right\}, $$

where $T(n)$ we denote the number of operations required to obtain a tree of $n$ vertices using the operations perepodpisanie and associations of the trees. This is a famous recurrence relation and it has a solution $T(n) = O(n \log n)$.

Thus, the total time spent on all of perepodpisanie, will make $O(n \log n)$, if we will always be the lesser of two pereozvuchivat tree.

We have to maintain the size of each connected components, but the data structure "DSU" allows you to do this easily.

\li \bf{Search cycle}, formed by adding new edges $(a,b)$ in some tree. Practically, this means that we need to find the lowest common ancestor (LCA) of vertices $a$ and $b$.

Note that then we compress all the vertices of the detected cycle into one vertex, so we want any search algorithm LCA working in was its length.

Because all the information about the tree structure that we have, is links $par[]$ ancestors, then the only possibility is the following algorithm for finding LCA: we mark the vertices $a$ and $b$ as visited, then go to their ancestors ${\rm par}[a]$ and ${\rm par}[b]$ and we mark them, then to their ancestors, and so on, until it happens that at least one of the two current peaks are marked. This would mean that the current top --- is the required LCA, and you have to repeat the path from vertex $a$ from vertex $b$ --- thus we find the desired cycle.

Obviously, this algorithm runs in order of the length of the desired cycle, because each of the two directions could not pass a distance greater than this length.

\li \bf{Compression cycle}, formed by adding new edges $(a,b)$ in some tree.

We need to create a new component, the rib dvuhsvetnoe, which will consist of all vertices of the found cycle (it is clear that detected the loop itself could consist of any component of dvuhsvetnoe, but it doesn't change anything). In addition, it is necessary to compress so not to break the structure of the tree, and all indexes of ${\rm par}[]$ and two disjoint set Union have been correct.

The easiest way to do this --- \bf{shrink all vertices of the cycle in LCA}. In fact, the top-LCA is the highest of the compressed vertices, i.e. ${\rm par}$ remains unchanged. For all other compressed vertices to update too, nothing, because these nodes just cease to exist --- in the DSU for a component of dvuhsvetnoe all these vertices will be simply to point to the top-LCA.

But then it turns out that the DSU for the component dvuhsvetnoe heuristics works without Union-by-rank: always if we join vertices in the cycle to their LCA, then this heuristic has no place. In this case, in the asymptotics arise $O(\log n)$, since no heuristics to rank any operation with a DSU works for a time.

\bf{To achieve the asymptotic $O(1)$} with one request it is necessary to join vertices of the cycle according to rank the heuristics and then assign the ${\rm par}$ the new leader in ${\rm par}[{\rm LCA}]$.

}



\h2{the Implementation}

We present here the final realization of the whole algorithm.

In order to ease the DSU for the written component dvuhsvetnoe \bf{without ranking heuristics}, so the complexity will be $O(\log n)$ per query on average. (About how to reach an asymptotic $O(1)$ written above in the paragraph "Compression cycle".)

Also in this implementation, is not stored for yourself ribs-bridges, and kept only the quantity --- see the variable $\rm bridges$. However, wish will not be easy to have ${\rm set}$ of all the bridges.

Initially you should call the function ${\rm init}()$, which initializes two disjoint set Union (allocating each vertex in a separate set, and adding a size equal to one), affix ancestors ${\rm par}$.

The main function of this ${\rm add\_edge}(a,b)$, which processes the request to add the new edge.

The constant $\rm MAXN$ value must be set equal to the maximum possible number of vertices in the input graph.

A more detailed explanation of this implementation, see below.


\code
const int MAXN = ...;

int n, bridges, par[MAXN], bl[MAXN], comp[MAXN], size[MAXN];


void init() {
for (int i=0; i<n; ++i) {
bl[i] = comp[i] = i;
size[i] = 1;
par[i] = -1;
}
bridges = 0;
}


int get (int v) {
if (v==-1) return -1;
return bl[v]==v ? v : bl[v]=get(bl[v]);
}

get_comp int (int v) {
v = get(v);
return comp[v]==v ? v : comp[v]=get_comp(comp[v]);
}

void make_root (int v) {
v = get(v);
int root = v,
child = -1;
while (v != -1) {
int p = get(par[v]);
par[v] = child;
comp[v] = root;
child=v; v=p;
}
size[root] = size[child];
}


int cu, u[MAXN];

void merge_path (int a, int b) {
cu++;

vector<int> va, vb;
int lca = -1;
for(;;) {
if (a != -1) {
a = get(a);
va.pb (a);

if (u[a] == cu) {
lca = a;
break;
}
u[a] = cu;

a = par[a];
}

if (b != -1) {
b = get(b);
vb.pb (b);

if (u[b] == cu) {
lca = b;
break;
}
u[b] = cu;

b = par[b];
}
}

for (size_t i=0; i<va.size(); ++i) {
bl[va[i]] = lca;
if (va[i] == lca) break;
--bridges;
}
for (size_t i=0; i<vb.size(); ++i) {
bl[vb[i]] = lca;
if (vb[i] == lca) break;
--bridges;
}
}


void add_edge (int a, int b) {
a = get(a); b = get(b);
if (a == b) return;

int ca = get_comp(a),
cb = get_comp(b);
if (ca != cb) {
++bridges;
if (size[ca] > size[cb]) {
swap (a, b);
swap (ca, cb);
}
make_root (a);
par[a] = comp[a] = b;
size[cb] += size[a];
}
else
merge_path (a, b);
}
\endcode


Comment on code in more detail.

\bf{DSU for a component of dvuhsvetnoe} is stored in the array ${\rm bl}[]$, and a function that returns the leader of dvuhsvetnoe components --- is ${\rm get}(v)$. This function is used many times in the rest of your code, because you need to remember that after the compression of multiple vertices in one vertex all of these cease to exist, and instead there was only their leader, whose and stored the correct data (an ancestor of ${\rm par}$, the ancestor in disjoint sets for connected components, etc.).

\bf{disjoint sets for connected components} is stored in the array ${\rm comp}[]$, there is an additional array of ${\rm size}[]$ storage sizes of components. The function ${\rm get\_comp}(v)$ returns the leader of the connected components (which is actually the root of the tree).

\bf{Function perepodpisanie tree} ${\rm make\_root}(v)$ is open, as described above: she goes from vertex $v$ by the ancestors up to the root, each time redirecting ancestor $\rm par$ in the opposite direction (down, towards the vertex $v$). This also updates the pointer ${\rm comp}$ into disjoint sets for connected components, to point to the new root. After perepodpisanie the new root is put down the ${\rm size}$ connected components. Note that if you implement every time we call the function ${\rm getter} ()$ to get access to the leader of the strongly connected components, and not to any top which may have already been compressed.

\bf{Feature detection and compression path} ${\rm merge\_path}(a,b)$, as described above, searches for LCA of vertices $a$ and $b$, which rises from them in parallel up until a vertex does not meet a second time. In the interests of efficiency, traversed vertices are marked using the technique of "numerical used" for $O(1)$ instead of $\rm set$. Traversed paths are stored in the vectors $\rm va$ and $\rm vb$, then go through them a second time before LCA, thereby obtaining all the vertices of the cycle. All the vertices of the cycle are compressed, by attaching them to the LCA (this is the asymptotic $O(\log n)$, because during compression we do not use the rank heuristic). Simultaneously counts the number of traversed edges, which is equal to the number of bridges in a loop is detected (this amount is subtracted from $\rm bridges$).

Finally, \bf{function query processing} ${\rm add\_edge}(a,b)$ determines the connected components, which are vertices $a$ and $b$, and if they lie in different connected components, then a smaller tree pereodevatsya for the new root and then attached to a larger tree. Otherwise, if vertex $a$ and $b$ lie in the same tree, but in different components of dvuhsvetnoe, it calls the function ${\rm merge\_path}(a,b)$, which will detect the cycle and compresses it into a single component dvuhsvetnoe.


