\h1{Finding articulation points}

Let be given a connected undirected graph. \bf{an articulation Point} (or point of articulation, eng. "cut vertex or articulation point") is such a vertex whose removal makes the graph disconnected.

We will describe an algorithm based on depth-first search, working for $O(n+m)$, where $n$ is the number of vertices, $m$ --- ribs.


\h2{Algorithm}

Start a DFS from arbitrary vertex of the graph; let's denote it via $\rm root$. Note the following \bf{fact} (which is easy to prove):

\ul{

\li Suppose we are in the depth-first-search, now looking through all edges from the vertex $v \ne {\rm root}$. Then, if the current edge $(v,to)$ such that the vertices from $to$ and any of its descendant in the tree traversal in a depth of no return edges in any ancestor vertex $v$, the vertex $v$ is an articulation point. Otherwise, i.e. if the depth went through all edges from the vertex $v$, and have not found satisfying the above-mentioned conditions of the edge, then the vertex $v$ is an articulation point. (In fact, this condition we check whether there is no other path from $v$ to $to$)

\li let us now Consider the remaining case: $v = {\rm root}$. Then this vertex is an articulation point if and only when this node has more than one son in the tree depth. (In fact, this means that passing from $\rm root$ by an arbitrary edge, we are unable to circumvent the entire graph, from where it follows immediately that $\rm root$ --- the point of articulation).

}

(CP. the wording of this criterion with the criterion for \algohref=bridge_searching{search algorithm bridges}.)

Now then, how to verify this fact for each node effectively. For this we use the "times of the input in node" computed \algohref=dfs{algorithm of depth-first search}.

So, let $tin[v]$ is the set of depth-first search at vertex $v$. Now let's introduce an array $fup[v]$, which will allow us to answer the above queries. Time $fup[v]$ is equal to the minimum of sunset time at the very top, $tin[v]$, times of entering each vertex $p$, which is the end of some reverse edges $(v,p)$, and all values of $fup[to]$ for each vertex $to$ that is a direct son of the $v$ in the search tree:

$$ fup[v] = \min \cases{
tin[v] & \cr
tin[p], & {\rm for all} (v,p){\rm\ --- back edge } \cr
fup[to], & {\rm for all} (v,to){\rm\ --- tree edge } \cr
} $$

(here "back edge" --- return edge, "tree edge" --- the edge of the tree)

Then from vertex $v$ or its descendant has a back edge to its ancestor and then only when there is a son $to$ that $fup[to] < tin[v]$.

Thus, if for the current edge $(v,to)$ (- owned tree search) is $fup[to] \ge tin[v]$, then vertex $v$ is an articulation point. For the initial vertex $v = {\rm root}$ criterion another: for this top you need to count the number of direct sons in the tree depth.


\h2{the Implementation}

If to speak about the implementation, here we need to distinguish between three cases: when we are on the edge of the search tree in depth when we go on a return edge, and when trying to go over the edge of the tree in the opposite direction. It is, accordingly, cases $used[to]=false$, $used[to]=true ~ \&\& ~ to \ne parent$ and $to=parent$. Thus, we need to pass to the function search into the depth of the top ancestor of the current vertex.

\code
vector<int> g[MAXN];
bool used[MAXN];
int timer, tin[MAXN], fup[MAXN];

void dfs (int v, int p = -1) {
used[v] = true;
tin[v] = fup[v] = timer++;
int children = 0;
for (size_t i=0; i<g[v].size(); ++i) {
int to = g[v][i];
if (to == p) continue;
if (used[to])
fup[v] = min (fup[v], tin[to]);
else {
dfs (to, v);
fup[v] = min (fup[v], fup[to]);
if (fup[to] >= tin[v] && p != -1)
IS_CUTPOINT(v);
children++;
}
}
if (p == -1 && children > 1)
IS_CUTPOINT(v);
}

int main() {
int n;
... read n and g ...

timer = 0;
for (int i=0; i<n; ++i)
used[i] = false;
dfs (0);
}
\endcode

Here the constant $\rm MAXN$ must be set equal to the maximum possible number of vertices in the input graph.

The function ${\rm IS\_CUTPOINT}(v)$ in the code is some function that will react to the fact that the vertex $v$ is an articulation point, for example, show that the top of the screen (it should be noted that for the same vertices this function can be called several times).


\h2{Problem in online judges}

The task list in which you want to search for points of articulation:

\ul{
\li \href=http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=13&page=show_problem&problem=1140{UVA #10199 \bf {a"Tourist Guide"} ~~~~ [difficulty: easy]}
\li \href=http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=5&page=show_problem&problem=251{UVA #315 \bf{"Network"} ~~~~ [difficulty: easy]}
}


