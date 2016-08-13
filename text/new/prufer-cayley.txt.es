\h1{ Prufer Code. Cayley Formula. The number of ways to make the graph connected }

In this article we consider the so-called \bf{Prufer code}, which is a method of unambiguous encoding of a labeled tree through a sequence of numbers.

Using Prufer codes demonstrates proof \bf{formula Cayley} (specifying the number of spanning trees in the complete graph), and the solution of the problem of the number of ways to add to the given graph edges to make it connected.

\bf{note}. We will not consider trees consisting of a single vertex is a special case, where the most degenerate approval.



\h2{ Prufer Code }

Prufer code is a one-to-one way of coding labeled trees with $n$ vertices by a sequence of $n-2$ integers in the interval $[1;n]$. In other words, the Prufer code is the \bf{bijection} between all spanning trees of a complete graph and numeric sequences.

While using the Prufer code for storage and handling of trees is impractical due to the specificity of representation, Prufer codes find applications in solving combinatorial problems.

Author --- Prüfer, Heinz (Heinz Prüfer) --- this code was proposed in 1918 as proof of Cayley's formula (see below).


\h3{ Build Prufer code for the tree }

Prufer code is constructed as follows. Let $n-2$ times the following procedure: we choose a leaf of the tree with the smallest number, remove it from the tree, and add to Prufer code the node number that was associated with that sheet. In the end the tree will be only $2$ vertices, and this concludes the algorithm (the number of these vertices explicitly in code not written).

Thus, a prüfer code for a given tree is a sequence of $n-2$ numbers, where each number is --- the number of the vertex associated with the least on the time sheet --- ie is a number in the interval $[1;n]$.

The algorithm for computing the Prufer code is easily implemented with the asymptotic $O (n \log n)$, simply by maintaining a data structure to extract the minimum (for example, $\rm set<>$ or $\rm priority\_queue<>$ in C++), which contains a list of all current leaf:

\code
const int MAXN = ...;
int n;
vector<int> g[MAXN];
int degree[MAXN];
bool killed[MAXN];

vector<int> prufer_code() {
set<int> leaves;
for (int i=0; i<n; ++i) {
degree[i] = (int) g[i].size();
if (degree[i] == 1)
leaves.insert (i);
killed[i] = false;
}

vector<int> result (n-2);
for (int iter=0; iter<n-2; ++iter) {
int leaf = *leaves.begin();
leaves.erase (leaves.begin());
killed[leaf] = true;

int v;
for (size_t i=0; i<g[leaf].size(); ++i)
if (!killed[g[leaf][i]])
v = g[leaf][i];

result[iter] = v;
if (--degree[v] == 1)
leaves.insert (v);
}
return result;
}
\endcode

However, the construction of Prufer code can also be implemented in linear time, as described in the next section.


\h3{ Build Prufer code for the tree in linear time }

We present here a simple algorithm with complexity $O(n)$.

The essence of the algorithm is to store \bf{live ID} $ptr$, which will always move only in the direction of increasing vertex number.

At first glance, this is impossible, because in the process of building code Prufer numbers of leaves can both increase and \bf{decrease}. However, you will notice that the reduction take place only in a single case: code when you delete the current sheet its ancestor has a smaller room (this ancestor will be a minimal sheet, and removed from the tree at the next step Prufer code). Thus, the reduction can be handled in time $O(1)$, and nothing prevents the construction algorithm with \bf{linear asymptotics}:

\code
const int MAXN = ...;
int n;
vector<int> g[MAXN];
int parent[MAXN], degree[MAXN];

void dfs (int v) {
for (size_t i=0; i<g[v].size(); ++i) {
int to = g[v][i];
if (to != parent[v]) {
parent[to] = v;
dfs (to);
}
}
}

vector<int> prufer_code() {
parent[n-1] = -1;
dfs (n-1);

int ptr = -1;
for (int i=0; i<n; ++i) {
degree[i] = (int) g[i].size();
if (degree[i] == 1 && ptr == -1)
ptr = i;
}

vector<int> result;
int leaf = ptr;
for (int iter=0; iter<n-2; ++iter) {
int next = parent[leaf];
result.push_back (next);
--degree[next];
if (degree[next] == 1 && next < ptr)
leaf = next;
else {
ptr++;
while (ptr<n && degree[ptr] != 1)
ptr++;
leaf = ptr;
}
}
return result;
}
\endcode

Comment on this code. The main function here --- $\rm prufer\_code ()$ that returns the Prufer code for the tree specified in the global variables $n$ (number of vertices) and $g$ (the adjacency lists specifying the count). First, we find for each vertex of its ancestor ${\rm parent}[i]$ --- i.e., the ancestor of which this vertex will have at the time of removal from the tree (all of which we can find in advance, using the fact that the maximum vertex $n-1$ is never removed from the tree). Also we find for each vertex the degree ${\rm degree}[i]$. The $\rm ptr$ --- this is a moving pointer ("candidate" for minimum sheet), which changed only upwards. The $\rm leaf$ is the current sheet with the minimum number. Thus, each iteration of the Prufer code is to add $\rm leaf$ in the answer and check if you turned $\rm parent[leaf]$ is less than the current candidate $\rm ptr$: if was is less, we just assign $\rm leaf = parent[leaf]$, and otherwise --- move pointer $\rm ptr$ to the next sheet.

As can be seen easily by code, the asymptotic behavior of the algorithm is indeed $O(n)$: index $\rm ptr$ will be just $O(n)$ changes and all other parts of the algorithm are obviously in linear time.


\h3{ Some properties of the Prufer code }

\ul{

\li after the construction of Prufer code in the tree will remain undeleted two vertices.

One of them will definitely be the vertex with the maximum room --- $n-1$, but about the other top nothing particular to say.

\li Each vertex occurs in Prufer code a certain number of times equal to its degree minus one.

It is easy to understand by noting that the vertex is removed from the tree at the moment when its degree is equal to one --- i.e. at this point, all adjacent edges except one have been removed. (For the two remaining post-build code vertices, this statement is also true.)

}


\h3{ Restore the tree by its code Prufer }

To restore the tree enough to notice from the previous paragraph that the degree of all nodes in the desired tree, we already know (and can calculate and store in a array $degree[]$). Therefore, we can find all the sheets, and, accordingly, the number of the lowest sheet --- which was removed in the first step. This sheet was connected to the top, which number is recorded in the first cell Prufer code.

Thus, we found the first edge that was deleted by the Prufer code. Add this edge to the answer, then reduce the degree of $degree[]$ at both ends of the rib.

Repeat this operation until all code review Prufer: to find the minimum vertex $degree = 1$, connect it with another top of the Prufer code, decrement degree[]$ at both ends.

In the end we will have only two vertices with $degree = 1$ --- these are the vertices that the algorithm Prufer left undeleted. Connect them by an edge.

The algorithm is completed, the search tree is built.

\bf{to Implement} this algorithm is easy for time $O (n \log n)$: maintaining in a data structure to extract the minimum (for example, $\rm set<>$ or $\rm priority\_queue<>$ in C++) the numbers of all vertices having $degree=1$, and taking from him every time at least.

We will give an implementation (where the function $prufer\_decode()$ returns the list of edges of the search tree):

\code
vector < pair<int,int> > prufer_decode (const vector<int> & prufer_code) {
int n = (int) prufer_code.size() + 2;
vector<int> degree (n, 1);
for (int i=0; i<n-2; ++i)
++degree[prufer_code[i]];

set<int> leaves;
for (int i=0; i<n; ++i)
if (degree[i] == 1)
leaves.insert (i);

vector < pair<int,int> > result;
for (int i=0; i<n-2; ++i) {
int leaf = *leaves.begin();
leaves.erase (leaves.begin());

int v = prufer_code[i];
result.push_back (make_pair (leaf, v));
if (--degree[v] == 1)
leaves.insert (v);
}
result.push_back (make_pair (*leaves.begin(), *--leaves.end()));
return result;
}
\endcode


\h3{ Restoring wood Prufer code in linear time }

To obtain an algorithm with linear asymptotics we can apply the same technique that was used to obtain a linear algorithm for computing the Prufer code.

In fact, to find the sheet with the lowest number is not necessary to have a data structure to extract the minimum. Instead, you will notice that after we find and process the current sheet, it adds to the consideration of only one new node. Therefore, we can do a moving pointer with the variable that stores the current minimum sheet:

\code
vector < pair<int,int> > prufer_decode_linear (const vector<int> & prufer_code) {
int n = (int) prufer_code.size() + 2;
vector<int> degree (n, 1);
for (int i=0; i<n-2; ++i)
++degree[prufer_code[i]];

int ptr = 0;
while (ptr < n && degree[ptr] != 1)
ptr++;
int leaf = ptr;

vector < pair<int,int> > result;
for (int i=0; i<n-2; ++i) {
int v = prufer_code[i];
result.push_back (make_pair (leaf, v));

--degree[leaf];
if (--degree[v] == 1 && v < ptr)
leaf = v;
else {
ptr++;
while (ptr < n && degree[ptr] != 1)
ptr++;
leaf = ptr;
}
}
for (int v=0; v<n-1; ++v)
if (degree[v] == 1)
result.push_back (make_pair (v, n-1));
return result;
}
\endcode


\h3{ Mutual unambiguous correspondence between trees and Prufer codes }

On the one hand, for each tree there is exactly one Prufer code corresponding to it (this follows from the definition of prüfer code).

On the other hand, the correctness of recovery algorithm on the code tree Prufer follows that any Prufer code (i.e. a sequence of $n-2$ numbers, where each number lies in the interval $[1;n]$) corresponds to a tree.

Thus, all the trees and prüfer codes of the form \bf{bijection}.



\h2{ Formula Cayley }

The formula of Cayley States that \bf{the number of spanning trees in a complete labeled graph} of $n$ vertices is equal to:

$$ n^{n-2}. $$

There are many \bf{proof} this formula, but the proof via Prufer codes clearly and constructively.

In fact, any set of $n-2$ numbers from the interval $[1;n]$ corresponds to a tree of $n$ vertices. Just different codes Prufer $n^{n-2}$. As in the case of a complete graph of $n$ vertices as the skeleton adapts to any tree, then the number of spanning trees is $n^{n-2}$, what we wanted to prove.



\h2{ the Number of ways to make the graph connected }

Power Prufer codes is that they allow you to get a more General formula than the formula of Cayley.

So, given a graph with $n$ vertices and $m$ edges, and let $k$ --- the number of connected components in this graph. You want to find the number of ways to add $k-1$ edge to the graph was connected (obviously, $k-1$ edge --- the minimum number of edges to make the graph connected).

Derive the formula for solving this problem.

Denote by $s_1, \ldots, s_k$ the sizes of the connected components of this graph. Since adding edges inside connected components is prohibited, it turns out that the task is very similar to finding the number of spanning trees in the complete graph of $k$ vertices: but the difference here is that each vertex has a "weight" $s_i$: each edge adjacent to $i$-th vertex, multiplies the answer by $s_i$.

Thus, to count the number of ways is important, what all have degree $k$ vertices in the skeleton. To obtain the formula for the task it is necessary to sum the responses on all possible levels.

Let $d_1, \ldots, d_k$ --- degree of vertices in the skeleton. Sum of degrees of vertices is twice the number of edges, so:

$$ \sum_{i=1}^k d_i = 2k-2. $$

If the $i$-th vertex has degree $d_i$ in a Prufer code she enters $d_i-1$ times. Prufer code for a tree of $k$ vertices has length $k-2$. The number of ways to choose a set of $k-2$ numbers, where $i$ occurs exactly $d_i-1$ times, \bf{multinomial coefficient} (similar to \algohref=binomial_coeff{binomial coefficient}):

$$ \binom{ k-2 }{ d_1-1, ~ d_2-1, ~ \ldots ~ , d_k-1 } = \frac{ (k-2)! }{ (d_1-1)! ~ (d_2-1)! ~ \ldots ~ (d_k-1)! }. $$

Given the fact that each edge adjacent to $i$-th vertex, multiplies the answer by $s_i$, we get that answer, provided that the degree sequence is $d_1, \ldots, d_k$, is equal to:

$$ s_1^{d_1} \cdot s_2^{d_2} \cdot \ldots \cdot s_k^{d_k} \cdot \frac{ (k-2)! }{ (d_1-1)! ~ (d_2-1)! ~ \ldots ~ (d_k-1)! }. $$

To obtain the answer to the problem need to sum this formula over all valid sets of $\{ d_i \}_{i=1}^{i=k}$:

$$ \sum_{ \substack{ d_i \ge 1, \\ \sum_{i=1}^k d_i = 2k-2 } } s_1^{d_1} \cdot s_2^{d_2} \cdot \ldots \cdot s_k^{d_k} \cdot \frac{ (k-2)! }{ (d_1-1)! ~ (d_2-1)! ~ \ldots ~ (d_k-1)! }. $$

To minimize this formula, we use the definition of the multinomial coefficient:

$$ (x_1 + \ldots x_m)^p = \sum_{ \substack{ c_i \ge 0, \\ \sum_{i=1}^{m} c_i = p } } x_1^{c_1} \cdot x_2^{c_2} \cdot \ldots \cdot x_m^{c_m} \cdot \binom{ m }{ c_1, ~ c_2, ~ \ldots ~ , c_k }. $$

Comparing this formula with the previous one, we obtain that denote $e_i = d_i-1$:

$$ \sum_{ \substack{ e_i \ge 0, \\ \sum_{i=1}^k e_i = k-2 } } s_1^{e_1+1} \cdot s_2^{e_2+1} \cdot \ldots \cdot s_k^{e_k+1} \cdot \frac{ (k-2)! }{ e_1! ~ e_2! ~ \ldots ~ e_k! }, $$

after folding \bf{the answer} is equal to:

$$ s_1 \cdot s_2 \cdot \ldots \cdot s_k \cdot (s_1 + s_2 + \ldots + s_k)^{k-2} = s_1 \cdot s_2 \cdot \ldots \cdot s_k \cdot n^{k-2}. $$

(This formula is true when $k=1$, although from the evidence it shouldn't have.)



\h2{ Problem in online judges }

Problem in online judges that apply the Prufer codes:

\ul{

\li \href=http://acm.uva.es/p/v108/10843.html{ UVA #10843 \bf{"Anne's game"} ~~~~~~ [difficulty: easy] }

\li \href=http://acm.timus.ru/problem.aspx?space=1&num=1069{ TIMUS #1069 \bf{"Code Prufer"} ~~~~~~ [difficulty: easy] }

\li \href=http://codeforces.EN/contest/156/problem/D{ CODEFORCES 110D \bf{"Evidence"} ~~~~~~ [difficulty: medium] }

\li \href=http://community.topcoder.com/stat?c=problem_statement&pm=10774&rd=14146{ TopCoder SRM 460 \bf{"TheCitiesAndRoadsDivTwo"} ~~~~~~ [difficulty: medium] }

}
