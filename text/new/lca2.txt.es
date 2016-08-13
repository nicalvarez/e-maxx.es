the <h1>Lowest common ancestor. Finding a O (log N) (binary expansion method)</h1>

<p>you are given a tree G. the input of the receive requests of the form (V1, V2), for each query you want to find their lowest common ancestor, i.e. the vertex V that lies on the path from the root to V1, the path from the root to V2, and from such vertices should choose the lowest. In other words, the desired vertex V is the parent and V1, and V2, and among all such common ancestors is selected lower. It is obvious that the least common ancestor of vertices V1 and V2 is their common ancestor that lies on a shortest path from V1 to V2. In particular, for example, if V1 is ancestor of V2, V1 is their least common ancestor.</p>
<p>In English, this problem is called LCA - Least Common Ancestor.</p>
<p>Here will be the considered algorithm, which is written much faster than described <algohref=lca>here</algohref>.</p>
<p>the Asymptotic behavior of the resulting algorithm will be equal to: a preprocess for <b>O (N log N)</b> and the response to each request for <b>O (log N)</b>.</p>
the <h2>the Algorithm</h2>
<p>let's calculate following values for each vertex of its 1-th ancestor 2nd ancestor, the 4th, etc. let us denote this array through P, i.e. P[i][j] is 2<sup>j</sup>-th ancestor of vertex i, i = 1..N, j = 0..&lceil;logN&rceil;. Also for each vertex we find the times of arriving and output of depth-first search (see <algohref=dfs - >"Search depth"</algohref>) is, we need to determine in O (1) whether one vertex to another ancestor (not necessarily immediate). This preprocessing can be done in a <b>O (N log N)</b>.</p>
<p>now Suppose there is next query - pair of vertices (A,B). Immediately check whether one vertex of the ancestor of the other - in this case it is the result. If A is not an ancestor of B, and B is not an ancestor of A, then we climb the ancestors of A, until we find the highest (i.e. closest to the root) vertex, which is not an ancestor (not necessarily immediate) B (i.e., such a vertex X such that X is not an ancestor of B and P[X][0] is an ancestor of B). In order to find the top X will be O (log N), using the array P.</p>
<p>Describe this process in more detail. Let L = &lceil;logN&rceil;. Suppose first that I = L. If P[A][I] is not an ancestor of B, assign to A = P[A][I] and decrement I. If P[A][I] is an ancestor of B, then just reduce I. Clearly, when I becomes less than zero, the vertex A will be the desired top - i.e. such that A is not an ancestor of B, but P[A][0] is an ancestor of B.</p>
<p>Now, obviously, the answer to LCA will be a P[A][0] - i.e., the smallest vertex among the ancestors of the original vertices A, who is also the ancestor of B.</p>
<p>Asymptotics. The whole algorithm of response to the request consists of changing I from L = &lceil;logN&rceil; to 0, and checks at each step in O(1), is one of the top ancestor of the other. Therefore, each request will be answered in O (log N).</p>
the <h2>Implementation</h2>
<code>int n, l;
vector &lt; vector&lt;int> > g;
vector&lt;int> tin, tout;
int timer;
vector &lt; vector&lt;int> > up;

void dfs (int v, int p = 0) {
tin[v] = ++timer;
up[v][0] = p;
for (int i=1; i&lt;=l; ++i)
up[v][i] = up[up[v][i-1]][i-1];
for (size_t i=0; i < g[v].size(); ++i) {
int to = g[v][i];
if (to != p)
dfs (to, v);
}
tout[v] = ++timer;
}

bool upper (int a, int b) {
return tin[a] < = tin[b] && tout[a] >= tout[b];
}

int lca (int a, int b) {
if (upper (a, b)) return a;
if (upper (b, a)) return b;
for (int i=l; i>=0; --i)
if (! upper (up[a][i], b))
a = up[a][i];
return up[a][0];
}

int main() {

... read n and g ...

tin.resize (n), tout.resize (n) up.resize (n);
l = 1;
while ((1&lt;&lt;l) &lt;= n) l++;
for (int i=0; i&lt;n; ++i) up[i].resize (l+1);
dfs (0);

for (;;) {
int a, b; // the current request
int res = lca (a, b); // the answer to the inquiry
}

}</code>
