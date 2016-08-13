the <h1>Finding Eulerian path in O (M)</h1>

<p>Euler path is a path in the graph passing through all its edges. An Euler cycle is an Euler path which is a cycle.</p>
<p>the Challenge is to find a Euler path in <b>the undirected multigraph with loops</b>.</p>
the <h2>the Algorithm</h2>
<p>First, check whether there is an Euler path. Then we find all simple cycles and combine them into one - this will be Eulerian cycle. If the graph is such that an Euler path is not a cycle, then, add the missing edge, find the Euler cycle, then remove the extra rib.</p>
<p>To check whether there is an Euler path, you need to use the following theorem. An Euler cycle exists if and only when the degree of all vertices is even. An Euler path exists if and only if the number of vertices with odd degree is two (or zero, in case of existence of Euler cycle).</p>
<p>in addition, of course, the graph must be connected enough (i.e. if we remove any isolated vertices, we should get a connected graph).</p>
<p>Find all cycles and combine them will be a recursive procedure:</p>
the <pre>procedure FindEulerPath (V)
1. to iterate over all edges outgoing from vertex V;
each edge removed from the graph, and
called FindEulerPath from the second end of the fin;
2. add the vertex V to the response.</pre>
<p>the Complexity of this algorithm is obviously linear on the number of edges.</p>
<p>But the same algorithm we can write in <b>non-recursive</b> version:</p>
the <pre>stack St;
St put in any vertex (starting vertex);
while St is not empty
let V be the value on the top of St;
if degree(V) = 0, then
add V to the response;
remove V from the top of St;
otherwise
find any edge going from V;
remove it from the graph;
the second end of this edge is placed in St;
</pre>
<p>it is Easy to check the equivalence of these two forms of the algorithm. However, the second form is obviously faster, and the code will be no more.</p>
the <h2>Task on Domino</h2>
<p>we Present here a classical problem for Euler cycle - the problem of dominoes.</p>
<p>There are N dominoes, as you know, at the two ends of dominoes contains one number (usually from 1 to 6, but in our case not important). You want to lay out all the dominoes in a row so that any two adjacent dominoes, the numbers written on their common side coincide. Dominoes is permitted to turn.</p>
<p>lets Reformulate the problem. Let the numbers written on donevska, the vertices of the graph and the dominoes - the edges of this graph (each Domino with the numbers (a,b) is edge (a,b) and (b,a)). Then our goal <b>is reduced to</b> the problem of finding the <b>Eulerian path</b> in this graph.</p>
the <h2>Implementation</h2>
<p>the following program searches for and displays an Euler cycle or path in a graph, or outputs -1 if it does not exist.</p>
<p>First, the program checks the degree of the vertices: if the vertices with odd degree is not, then the graph has an Euler cycle if there are 2 vertices with odd degree, the graph has only an Euler path (Eulerian cycle), if such vertices is greater than 2, then the graph has neither an Euler cycle nor an Euler path. To find the Euler path (not a cycle), proceed as follows: if V1 and V2 are two vertices of odd degree, we simply add an edge (V1,V2) in the resulting graph, find an Euler cycle (he, obviously, will exist), and then remove from the response a "dummy" edge (V1,V2). Euler cycle will look exactly as described above (non-recursive version), and at the same time at the end of this algorithm will check a connected was count or not (if the count was not coherent, then at the end of the algorithm will remain in the column, some ribs, and in this case we have output -1). Finally, the program takes into account that the graph can be isolated vertex.</p>
<code>int main() {

int n;
vector &lt; vector&lt;int> > g (n, vector&lt;int> (n));
... reading the graph in the adjacency matrix ...

vector&lt;int> deg (n);
for (int i=0; i&lt;n; ++i)
for (int j=0; j&lt;n; ++j)
deg[i] += g[i][j];

int first = 0;
while (!deg[first]) ++first;

int v1 = -1, v2 = -1;
bool bad = false;
for (int i=0; i&lt;n; ++i)
if (deg[i] & 1)
if (v1 == -1)
v1 = i;
else if (v2 == -1)
v2 = i;
else
bad = true;

if (v1 != -1)
g ++[v1][v2], ++g[v2][v1];

stack < int> st;
st.push (first);
vector&lt;int> res;
while (!st.empty())
{
int v = st.top();
int i;
for (i=0; i&lt;n; ++i)
if (g[v][i])
break;
if (i == n)
{
res.push_back (v);
st.pop();
}
else
{
--g[v][i];
--g[i][v];
st.push (i);
}
}

if (v1 != -1)
for (size_t i=0; i+1&lt;res.size(); ++i)
if (res[i] == v1 && res[i+1] == v2 || res[i] == v2 && res[i+1] == v1)
{
vector&lt;int> res2;
for (size_t j=i+1; j&lt;res.size(); ++j)
res2.push_back (res[j]);
for (size_t j=1; j < =i; ++j)
res2.push_back (res[j]);
res = res2;
break;
}

for (int i=0; i&lt;n; ++i)
for (int j=0; j&lt;n; ++j)
if (g[i][j])
bad = true;

if (bad)
puts ("-1");
else
for (size_t i=0; i&lt;res.size(); ++i)
printf ("%d ", res[i]+1);

}</code>
