the <h1>Checking the count on acyclicity and finding cycle</h1>

<p>Suppose you are given a directed or undirected graph without loops and multiple edges. You want to check whether it is acyclic, and if it is not, it is possible to find any cycle.</p>
<p>we Solve this problem by using <algohref=dfs>DFS</algohref> O (M).</p>
the <h2>the Algorithm</h2>
<p>will Produce a series of searches in depth in the graph. I.e., from every vertex, which we had never come, start the search depth, which is at the entrance to the summit will paint it in grey, but in black. And if the depth-first search tries to go to the grey top, it means that we found a loop (if the graph is undirected, the cases when depth-first search from a vertex tries to go to an ancestor, are not considered).</p>
<p>the cycle can be restored by walking down the parent array.</p>
the <h2>Implementation</h2>
<p>Here is an implementation for directed graphs.</p>
<code>int n;
vector &lt; vector&lt;int> > g;
vector&lt;char> cl;
vector&lt;int> p;
int cycle_st, cycle_end;

bool dfs (int v) {
cl[v] = 1;
for (size_t i=0; i < g[v].size(); ++i) {
int to = g[v][i];
if (cl[to] == 0) {
p[to] = v;
if (dfs (to)) return true;
}
else if (cl[to] == 1) {
cycle_end = v;
cycle_st = to;
return true;
}
}
cl[v] = 2;
return false;
}

int main() {
... reading graph ...

p.assign (n, -1);
cl.assign (n, 0);
cycle_st = -1;
for (int i=0; i&lt;n; ++i)
if (dfs (i))
break;

if (cycle_st == -1)
puts ("Acyclic");
else {
puts ("Cyclic");
vector&lt;int> cycle;
cycle.push_back (cycle_st);
for (int v=cycle_end; v!=cycle_st; v=p[v])
cycle.push_back (v);
cycle.push_back (cycle_st);
reverse (cycle.begin(), cycle.end());
for (size_t i=0; i&lt;cycle.size(); ++i)
printf ("%d ", cycle[i]+1);
}
}</code>
