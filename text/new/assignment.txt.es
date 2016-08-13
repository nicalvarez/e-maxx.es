the <h1>Task assignment. The solution using min-cost-flow</h1>

<p>Task has two equivalent productions:</p>
the <ul>
the <li>Given a square matrix A[1..N,1..N]. You need to choose it N elements so that each row and column has exactly one selected element and the sum of these elements was the lowest.</li>
the <li>There are N machines and N orders. About every order known to the cost of manufacturing each machine. Each machine can only execute one order. It is required to distribute all orders for the machines so as to minimize the total cost.</li>
</ul>
<p>Here we consider the solution of the problem based on the algorithm <algohref=min_cost_flow>finding a flow of minimum cost (min-cost-flow)</algohref>, solving the problem of appointments for <b>O (N<sup>5</sup>)</b>.</p>
<h2>Description</h2>
<p><b>Build</b> bipartite network: a source S, a drain T, in the first part contains N vertices (corresponding to the rows of the matrix or orders), the second is also N vertices (corresponding to the columns of a matrix or the machines). Between each node i of the first fraction and each vertex j of the second fraction hold an edge with capacity 1 and cost A<sub>ij</sub>. From the source S will have edges to all vertices i in first share with capacity 1 and cost 0. From each vertex of the second fraction j to the sink T hold an edge with capacity 1 and cost 0.</p>
<p>we Find in the network the maximum flow of minimum cost. Obviously, the flow rate will be equal to N. Further, it is obvious that for each vertex i from the first fraction there is exactly one vertex j of the second lobe, such that the flux F<sub>ij</sub> = 1. Finally, obviously, this is a one-one correspondence between vertices of the first lobe and the second vertex is the solution of the problem (as found flow has minimum cost, the sum of costs of chosen edges will be the smallest possible, which is the optimality criterion).</p>
<p>Asymptotics of this solution of the assignment problem depends on how the algorithm searches for the maximum flow of minimum cost. Asymptotics will be <b>O (N<sup>3</sup>)</b> when using Dijkstra's algorithm or O (N<sup>4</sup>) when using algorithm Ford-Bellman.</p>
the <h2>Implementation</h2>
<p>the implementation Shown here long, perhaps it can be reduced significantly.</p>
<code>typedef vector&lt;int> vint;
typedef vector < vint> vvint;

const int INF = 1000*1000*1000;


int main()
{
int n;
vvint a (n, vint (n));
... reading a ...

int m = n * 2 + 2;
vvint f (m, vint (m));
int s = m-2, t = m-1;
int cost = 0;
for (;;)
{
vector&lt;int> dist (m, INF);
vector&lt;int> p (m);
vector&lt;int> type (m, 2);
deque&lt;int> q;
dist[s] = 0;
p[s] = -1;
type[s] = 1;
q.push_back (s);
for (; !q.empty(); )
{
int v = q.front(); q.pop_front();
type[v] = 0;
if (v == s)
{
for (int i=0; i&lt;n; ++i)
if (f[s][i] == 0)
{
dist[i] = 0;
p[i] = s;
type[i] = 1;
q.push_back (i);
}
}
else
{
if (v &lt; n)
{
for (int j=n; j&lt;n+n; ++j)
if (f[v][j] &lt; 1 && dist[j] > dist[v] + a[v][j-n])
{
dist[j] = dist[v] + a[v][j-n];
p[j] = v;
if (type[j] == 0)
q.push_front (j);
else if (type[j] == 2)
q.push_back (j);
type[j] = 1;
}
}
else
{
for (int j=0; j&lt;n; ++j)
if (f[v][j] &lt; 0 && dist[j] > dist[v] - a[j][v-n])
{
dist[j] = dist[v] - a[j][v-n];
p[j] = v;
if (type[j] == 0)
q.push_front (j);
else if (type[j] == 2)
q.push_back (j);
type[j] = 1;
}
}
}
}

int curcost = INF;
for (int i=n; i&lt;n+n; ++i)
if (f[i][t] == 0 && dist[i] &lt; curcost)
{
curcost = dist[i];
p[t] = i;
}
if (curcost == INF) break;
cost += curcost;
for (int cur=t; cur!=-1; cur=p[cur])
{
int prev = p[cur];
if (prev!=-1)
f[cur][prev] = (f[prev][cur] = 1);
}

}

printf ("%d\n", cost);
for (int i=0; i&lt;n; ++i)
for (int j=0; j&lt;n; ++j)
if (f[i][j+n] == 1)
printf ("%d ", j+1);

}</code>
