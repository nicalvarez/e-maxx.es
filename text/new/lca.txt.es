the <h1>Lowest common ancestor. Finding O (sqrt (N)) and O (log N) with preprocessing O (N)</h1>
<p>you are given a tree G. the input of the receive requests of the form (V1, V2), for each query you want to find their lowest common ancestor, i.e. the vertex V that lies on the path from the root to V1, the path from the root to V2, and from such vertices should choose the lowest. In other words, the desired vertex V is the parent and V1, and V2, and among all such common ancestors is selected lower. It is obvious that the least common ancestor of vertices V1 and V2 is their common ancestor that lies on a shortest path from V1 to V2. In particular, for example, if V1 is ancestor of V2, V1 is their least common ancestor.</p>
<p>In English, this problem is called LCA - Least Common Ancestor.</p>
the <h2>the Idea of the algorithm</h2>
<p>Before responding, run the so-called <b>preprocessing</b>. Run DFS from the root, which will build the list of visit Order of the vertices (the vertex is added to the list at the entrance to the next vertex, and after each return from her son), it is easy to see that the final size of this list will be O (N). And construct the First array[1..N] in which for each vertex will identify the position in the Order array, which is this vertex, i.e. Order[First[I]] = I for all I. Also with the help of depth-first search will find the height of each vertex (the distance from the root to it) - H[1..N].</p>
<p>How now responding? Suppose you have the current request is a pair of vertices V1 and V2. Let us consider the Order between the indices of the First[V1] and First[V2]. It is easy to see that in this range will be sought, and LCA (V1, V2), as well as many other peaks. However, LCA (V1, V2) will be different from the rest of the vertices being the vertex with the smallest height.</p>
<p>Thus, to answer the query, we just need <b>to find the vertex with smallest height</b> in the array Order in the First range between[V1] and First[V2]. Thus, <b>task LCA is reduced to <algohref=rmq>the task of RMQ</algohref></b> ("minimum segment"). And the last problem is solved by using data structures (see <algohref=rmq>task RMQ</algohref>).</p>
<p>If you use <algohref=sqrt_decomposition><b>sqrt-decomposition</b></algohref>, it is possible to obtain a decision that responds to a request for <b>O (sqrt (N))</b> and performing the preprocessing in O (N).</p>
<p>If you use <algohref=segment_tree><b>tree</b></algohref>, it is possible to obtain a decision that responds to a request for <b>O (log (N))</b> and performing the preprocessing in O (N).</p>
the <h2>Implementation</h2>
<p>it will provide a ready implementation of LCA using segment trees:</p>
<code>typedef vector &lt; vector&lt;int> > graph;
typedef vector&lt;int>::const_iterator const_graph_iter;


vector&lt;int> lca_h, lca_dfs_list, lca_first, lca_tree;
vector&lt;char> lca_dfs_used;

lca_dfs void (const graph & g, int v, int h = 1)
{
lca_dfs_used[v] = true;
lca_h[v] = h;
lca_dfs_list.push_back (v);
for (const_graph_iter i = g[v].begin(); i != g[v].end(); ++i)
if (!lca_dfs_used[*i])
{
lca_dfs (g, *i, h+1);
lca_dfs_list.push_back (v);
}
}

void lca_build_tree (int i, int l, int r)
{
if (l == r)
lca_tree[i] = lca_dfs_list[l];
else
{
int m = (l + r) >> 1;
lca_build_tree (i+i, l, m);
lca_build_tree (i+i+1, m+1, r);
if (lca_h[lca_tree[i+i]] &lt; lca_h[lca_tree[i+i+1]])
lca_tree[i] = lca_tree[i+i];
else
lca_tree[i] = lca_tree[i+i+1];
}
}

lca_prepare void (const graph & g, int root)
{
int n = (int) g.size();
lca_h.resize (n);
lca_dfs_list.reserve (n*2);
lca_dfs_used.assign (n, 0);

lca_dfs (g, root);

int m = (int) lca_dfs_list.size();
lca_tree.assign (lca_dfs_list.size() * 4 + 1, -1);
lca_build_tree (1, 0, m-1);

lca_first.assign (n, -1);
for (int i = 0; i &lt; m; ++i)
{
int v = lca_dfs_list[i];
if (lca_first[v] == -1)
lca_first[v] = i;
}
}

int lca_tree_min (int i, int sl, int sr, int l, int r)
{
    if (sl == l && sr == r)
        return lca_tree[i];
    int sm = (sl + sr) >> 1;
    if (r &lt;= sm)
        lca_tree_min return (i+i, sl, sm, l, r);
    if (l > sm)
        lca_tree_min return (i+i+1, sm+1, SK, l, r);
    int ans1 = lca_tree_min (i+i, sl, sm, l, sm);
    int ans2 = lca_tree_min (i+i+1, sm+1, sr, sm+1, r);
    lca_h return[ans1] &lt; lca_h[ans2] ? ans1 : ans2;
}

int lca (int a, int b)
{
    int left = lca_first[a],
        right = lca_first[b];
    if (left > right) swap (left, right);
    return lca_tree_min (1, 0, (int)lca_dfs_list.size()-1, left, right);
}

int main()
{
    graph g;
    int root;
    ... reading graph ...

        lca_prepare (g, root);

    for (;;)
    {
        int v1, v2; // made the request
        int v = lca (v1, v2); // the answer to the inquiry
    }
}</code>
