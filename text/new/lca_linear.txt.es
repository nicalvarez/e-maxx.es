the <h1>Lowest common ancestor. The finding in O (1) preprocessing O (N) (algorithm Farah-Colton and Bender)</h1>
<p>you are given a tree G. the input of the receive requests of the form (V1, V2), for each query you want to find their lowest common ancestor, i.e. the vertex V that lies on the path from the root to V1, the path from the root to V2, and from such vertices should choose the lowest. In other words, the desired vertex V is the parent and V1, and V2, and among all such common ancestors is selected lower. It is obvious that the least common ancestor of vertices V1 and V2 is their common ancestor that lies on a shortest path from V1 to V2. In particular, for example, if V1 is ancestor of V2, V1 is their least common ancestor.</p>
<p>In English, this problem is called LCA - Least Common Ancestor.</p>
<p>Describe here the algorithm Farah-Colton and Bender (Farach-Colton, Bender) is asymptotically optimal and relatively simple (compared with other algorithms, for example, the Gate-Vishkin).</p>
the <h2>the Algorithm</h2>
<p>we will Use the classical reduction of the problem LCA <b>to the task of RMQ</b> (at least on the stretch) (for more details see <algohref=lca>Lowest common ancestor. Finding O (sqrt (N)) and O (log N) with preprocessing O (N)</algohref>). Learn now to solve the RMQ problem in this particular case, with a preprocessing O (N) time and O (1) per query.</p>
<p>note that the RMQ problem, we have reduced the problem of LCA is very specific: any two adjacent elements in the array <b>differ by exactly one unit</b> (since the elements of an array is nothing more than the height of the vertices visited in order of traversal, and we either go to the descendant, then the next element will be 1 more, or go to the ancestor, then the next element would be 1 less). The actual algorithm Farah-Colton and Bender is the solution of this problem RMQ.</p>
<p>denote by a the array over which queries are executed RMQ, and N is the size of this array.</p>
<p>we will Construct the algorithm that solves the problem <b>with preprocessing O (N log N) and O (1) on request</b>. It is easy to do: create a so-called Sparse Table T[l,i], where each element T[l,i] is equal to the minimum of A on the interval [l; l+2<sup>i</sup>). Obviously, 0 &lt;= i &lt;= &lceil;log N&rceil;, and therefore the size of the Sparse Table will be O (N log N). To build it as easily in O (N log N) by noting that T[l,i] = min (T[l,i-1], T[l+2<sup>i-1</sup>,i-1]). Now how to answer each query RMQ in O (1)? Let the received query (l,r), then the answer is min (T[l,sz], T[r-2<sup>sz</sup>+1,sz]), where sz is the largest power of two not exceeding r-l+1. Indeed, we would take a cut (l,r) and cover it with two line segments of length 2<sup>sz</sup> - one starting in l and the other ending in r (and these segments overlap, which in this case does not prevent us). To truly achieve the asymptotics O (1) on request, we must predpochitaete sz values for all possible lengths from 1 to N.</p>
<p>Now let's describe <b>how to improve</b> this algorithm asymptotics up to O (N).</p>
<p>Divide the array A into blocks of size K = 0.5 log<sub>2</sub> N. For each block, calculate the minimum element and its position (as for solving the problem of LCA is important for us not the minima, and their positions). Let B is an array of size N / K, made up of the lows in each block. Construct the Sparse array Table B, as described above, the size of the Sparse Table and the time of its construction will be equal to:</p>
<formula>N/K log N/K = (2N / log N) log (2N / log N) =
= (2N / log N) (1 + log (N / log N)) &lt;= 2N / log N + 2N = O (N)</formula>
<p>Now we just have to learn to quickly answer the query RMQ <b>inside each</b>. In fact, if I received a query RMQ(l,r), if l and r are in different blocks, then the answer is a minimum of the following values: low in the block l, starting with l to the end of the block, then at least in the blocks after l until r (not inclusive), and finally the minimum in the block r from block r to. On request "low blocks" we can answer in O (1) using the Sparse Table, with only the RMQ queries inside blocks.</p>
<p>Here we use "+-1". Note that, if within each block from each element subtract the first element, then all blocks are uniquely determined by the sequence of length K-1 consisting of the numbers +-1. Therefore, the number of different blocks will be equal to:</p>
<formula>2<sup>K-1</sup> = 2<sup>0.5 log N - 1</sup> = 0.5 sqrt(N)</formula>
<p>so, number of different blocks will be O (sqrt (N)), and therefore we can predpochitaete results RMQ inside all the different blocks in O (sqrt(N) K<sup>2</sup>) = O (sqrt(N) log<sup>2</sup> N) = O (N). From the point of view of implementation, we can every block to characterize a bit mask of length K-1 (which, obviously, will fit in a standard int), and log RMQ predpochtenie some array R[mask,l,r] of size O (sqrt(N) log<sup>2</sup> N).</p>
<p>so, we have learned predpochitaut the RMQ results within each block, as well as RMQ over by the blocks sum up to O (N), and to answer each query RMQ in O (1) - using only pre-calculated values in the worst case four: in block l, block r, and on the blocks between l and r inclusive.</p>
the <h2>Implementation</h2>
<p>At the beginning of the program specified the constant MAXN, LOG_MAXLIST and SQRT_MAXLIST determining the maximum number of vertices in the graph, which, if necessary, should be increased.</p>
<code>const int MAXN = 100*1000;
const int MAXLIST = MAXN * 2;
const int LOG_MAXLIST = 18;
const int SQRT_MAXLIST = 447;
const int MAXBLOCKS = MAXLIST / ((LOG_MAXLIST+1)/2) + 1;

int n, root;
vector&lt;int> g[MAXN];
int h[MAXN]; // vertex height
vector&lt;int> a; // dfs list
int a_pos[MAXN]; // positions in dfs list
int block; // block size = 0.5 log A. size()
int bt[MAXBLOCKS][LOG_MAXLIST+1]; // sparse table on blocks (relative positions in minimum blocks)
int bhash[MAXBLOCKS]; // block hashes
int brmq[SQRT_MAXLIST][LOG_MAXLIST/2][LOG_MAXLIST/2]; // rmq inside each block, indexed by block hash
int log2[2*MAXN]; // precalced logarithms (floored values)

// walk the graph
void dfs (int v, int curh) {
h[v] = curh;
a_pos[v] = (int)a.size();
a.push_back (v);
for (size_t i=0; i < g[v].size(); ++i)
if (h[g[v][i]] == -1) {
dfs (g[v][i], curh+1);
a.push_back (v);
}
}

int log (int n) {
int res = 1;
while (1&lt;&lt;res &lt; n) res++;
return res;
}

// compares two indices in a
inline int min_h (int i, int j) {
return h[a[i]] &lt; h[a[j]] ? i : j;
}

// O(N) preprocessing
void build_lca() {
int sz = (int)a.size();
block = (log(sz) + 1) / 2;
int blocks = sz / block + (sz % block ? 1 : 0);

// precalc in each block and build sparse table
memset (bt, 255, sizeof bt);
for (int i=0, bl=0, j=0; i&lt;sz; ++i, ++j) {
if (j == block)
j = 0, ++bl;
if (bt[bl][0] == -1 || min_h (i, bt[bl][0]) == i)
bt[bl][0] = i;
}
for (int j=1; j&lt;=log(sz); ++j)
for (int i=0; i&lt;blocks; ++i) {
int ni = i + (1&lt;&lt;(j-1));
if (ni >= blocks)
bt[i][j] = bt[i][j-1];
else
bt[i][j] = min_h (bt[i][j-1], bt[ni][j-1]);
}

// calc the hashes of blocks
memset (bhash, 0, sizeof bhash);
for (int i=0, bl=0, j=0; i&lt;sz||j < block; ++i, ++j) {
if (j == block)
j = 0, ++bl;
if (j > 0 && (i >= sz || min_h (i-1, i) == i-1))
bhash[bl] += 1&lt;&lt;(j-1);
}

// precalc RMQ inside each unique block
memset (brmq, 255, sizeof brmq);
for (int i=0; i&lt;blocks; ++i) {
int id = bhash[i];
if (brmq[id][0][0] != -1) continue;
for (int l=0; l < block; ++l) {
brmq[id][l][l] = l;
for (int r=l+1; r < block; ++r) {
brmq[id][l][r] = brmq[id][l][r-1];
if (i*block+r &lt; sz)
brmq[id][l][r] =
min_h (i*block+brmq[id][l][r], i*block+r) - i*block;
}
}
}

// precalc logarithms
for (int i=0, j=0; i&lt;sz; ++i) {
if (1&lt;&lt;(j+1) &lt;= i) j++;
log2[i] = j;
}
}

// answers RMQ in block #bl [l;r] in O(1)
inline int lca_in_block (int bl, int l, int r) {
return brmq[bhash[bl]][l][r] + bl*block;
}

// answers LCA in O(1)
int lca (int v1, int v2) {
int l = a_pos[v1], r = a_pos[v2];
if (l > r) swap (l, r);
int bl = l/block, br = r/block;
if (bl == br)
return a[lca_in_block(bl,l%block,r%block)];
int ans1 = lca_in_block(bl,l%block,block-1);
int ans2 = lca_in_block(br,0,r%block);
int ans = min_h (ans1, ans2);
if (bl &lt; br - 1) {
int pw2 = log2[br-bl-1];
int ans3 = bt[bl+1][pw2];
int ans4 = bt[br-(1&lt;&lt;pw2)][pw2];
ans = min_h (ans, min_h (ans3, ans4));
}
return a[ans];
}</code>
