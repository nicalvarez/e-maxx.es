the <h1>a modification of the method of Pushing preporuka to find the maximum flow in O (N<sup>3</sup>)</h1>

<p>it is Assumed that you have already read <algohref=preflow_push>Method of Pushing preporuka find the maximum flow in O (N<sup>4</sup>)</algohref>.</p>
<h2>Description</h2>
<p>the Modification is extremely simple: at each iteration, among all the crowded vertices, we select only those peaks which have <b>the height</b>, and apply the pushing/raising only those vertices. Moreover, to select the vertex with the largest height we do not need any data structure, simply keep a list of vertices with the highest height and just recalculate it if all vertices in this list have been processed (then the list will be added to vertices with lower height), and when a new crowded peaks with greater height than in the list, clear the list and add vertex to the list.</p>
<p>Despite its simplicity, this modification allows to reduce complexity by one order. To be precise, the obtained asymptotics of the algorithm is <b>O (N M + N<sup>2</sup> sqrt (M))</b>, which in worst case is <b>O (N<sup>3</sup>)</b>.</p>
<p>This modification was proposed by Ceriana (Cheriyan) and Maheshwari (Maheshvari) in 1989</p>
the <h2>Implementation</h2>
<p>Here is the finished implementation of this algorithm.</p>
<p>Unlike conventional algorithm push - only in the presence of array maxh, in which to store rooms crowded vertices with maximum height. The size of the array is specified in the variable sz. If at some iteration it turns out that this array is empty (sz==0), then we fill it (just went through all the vertices); if the array is still empty, not crowded vertices, and the algorithm stops. Otherwise we iterate through the vertices in this list, with or without pushing or lifting. After the operation pushing the current node may cease to be overcrowded; in this case remove it from the list of maxh. If after an operation of raising the height of the current peaks becomes greater than the height of the peaks in the list maxh, then we clear the list (sz=0) and immediately proceed to the next iteration of the algorithm push (which will be built a new list maxh).</p>
<code>const int INF = 1000*1000*1000;

int main() {

int n;
vector &lt; vector&lt;int> > c (n, vector&lt;int> (n));
int s, t;
... read n, c, s, t ...

vector&lt;int> e (n);
vector&lt;int> h (n);
h[s] = n-1;
vector &lt; vector&lt;int> > f (n, vector&lt;int> (n));

for (int i=0; i&lt;n; ++i) {
f[s][i] = c[s][i];
f[i][s] = -f[s][i];
e[i] = c[s][i];
}

vector&lt;int> maxh (n);
int sz = 0;
for (;;) {
if (!sz)
for (int i=0; i&lt;n; ++i)
if (i != s && i != t && e[i] > 0) {
if (sz && h[i] > h[maxh[0]])
sz = 0;
if (!sz || h[i] == h[maxh[0]])
maxh[sz++] = i;
}
if (!sz) break;
while (sz) {
int i = maxh[sz-1];
bool pushed = false;
for (int j=0; j&lt;n && e[i]; ++j)
if (c[i][j]-f[i][j] > 0 && h[i] == h[j]+1) {
pushed = true;
int addf = min (c[i][j]-f[i][j], e[i]);
f[i][j] += addf, f[j][i] -= addf;
e[i] -= addf, e[j] += addf;
if (e[i] == 0) sz--;
}
if (!pushed) {
h[i] = INF;
for (int j=0; j&lt;n; ++j)
if (c[i][j]-f[i][j] > 0 && h[j]+1 &lt; h[i])
h[i] = h[j]+1;
if (h[i] > h[maxh[0]]) {
sz = 0;
break;
}
}
}
}

... output stream f ...

}</code>
