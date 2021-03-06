
\h1{ Hungarian algorithm for solving assignment problem }



\h2{ the Formulation of the assignment problem }

Task assignment is very natural.

Here are a few \bf{setting options} (as it is easy to see, they are all equivalent):

\ul{

\li There are $n$ workers and $n$ jobs. For each worker know how much money he will request for performing a particular job. Each worker can take only one job. It is required to distribute tasks on a work so as to minimize the total costs.

\li Given a matrix $a$ of size $n \times n$. Required in every line to select one number so that in any selected column exactly one number, and the amount of selected numbers would be minimal.

\li Given a matrix $a$ of size $n \times n$. You want to find such a permutation $p$ of length $n$, the value $\sum a[i][p[i]]$ --- minimum.

\li Given a complete bipartite graph with $n$ vertices; each edge is assigned some weight. You want to find a perfect matching of minimum weight.

}

Note that all the above setting of "\bf{square}": both dimensions always coincide (and equal to $n$). In practice, often similar to the "\bf{rectangular}" productions, when $n \ne m$, and we must choose $\min(n,m)$ elements. However, as is easily seen, from "rectangular" tasks you can always move to a square by adding rows/columns with zero/infinite values, respectively.

Also note that by analogy with the search \bf{minimal} solution can also be set the task of search \bf{maximum} solutions. However, these two problems are equivalent to each other: enough all the weights multiplied by $-1$.



\h2{ Hungarian algorithm }


\h3{ Historical note }

The algorithm was developed and published by Harold \bf{Kun} (Harold Kuhn) in 1955, Kuhn Himself gave the algorithm the name "Hungarian" because it was largely based on earlier works of two Hungarian mathematicians: dénes \bf{Koenig} (Dénes Kőnig) and eigen \bf{egervari} (Jenő Egerváry).

In 1957, James \bf{Munkres} (James Munkres) showed that this algorithm runs in (strongly) polynomial time (i.e. time polynomial of order $n$, independent of the magnitude of value).

Therefore in the literature this algorithm is known not only as "Hungarian", but as "algorithm Kuhn-Munkres" or "algorithm Munkres".

However, recently (in 2006) it became clear that the same algorithm was invented \bf{a century before Kuhn} German mathematician Carl Gustav \bf{Jacobi} (Carl Gustav Jacobi). The fact that his work "About the research of the order of a system of arbitrary ordinary differential equations", printed posthumously in 1890, which contained among other results and a polynomial algorithm solving the assignment problem, was written in Latin, and its publication \bf{gone unnoticed} among mathematicians.

It is also worth noting that the original algorithm Kuna had complexity $O(n^4)$, and then Jack \bf{Edmonds} (Jack Edmonds), and Richard \bf{Carp} (Richard Karp) (and independently \bf{Tomizawa} (Tomizawa)) showed how to improve it to the asymptotic behavior of $O(n^3)$.


\h3{ development of an algorithm for $O(n^4)$ }

Just note to avoid ambiguities, we mostly consider here the task assignments in the matrix formulation (i.e., given a matrix $a$, and we must choose $n$ cells in different rows and columns). Indexing of arrays we begin with the units, i.e., for example, the matrix $a$ has indexes $a[1 \ldots n][1 \ldots n]$.

Also, we assume that all numbers in the matrix $a[][]$ \bf{nonnegative} (if not, you can always go to a nonnegative matrix by adding all numbers to some number).

Let's call \bf{potential} two arbitrary array of numbers $u[1 \ldots n]$ and $v[1 \ldots n]$ such that the following condition holds:

$$ u[i] + v[j] \le a[i][j] ~~~~ (i = 1 \ldots n, ~~ j = 1 \ldots n). $$

(As you can see, the number $u[i]$ correspond to the rows, and the numbers $v[j]$ --- the columns of the matrix.)

Let's call \bf{the value of $f$ capacity} the sum of its numbers:

$$ f = \sum_{i=1}^n u[i] + \sum_{i=1}^n v[i]. $$

On the one hand, it is easy to notice that the cost of the desired solution $sol$ \bf{not less} the value of any capacity:

$$ sol \ge f. $$

(Proof. The sought solution of the problem consists of $n$ cells matrix, and for each of them the condition $u[i] + v[j] \le a[i][j]$. Since all the elements are in different rows and columns, then, summing up these inequalities for all selected $a[i][j]$ in the left part of the inequality we get $f$, and the right --- $sol$, what we wanted to prove.)

On the other hand, it turns out that there is always a solution and the potential at which this inequality \bf{becomes an equality}. Hungarian algorithm, described below, will be a constructive proof of that fact. Meantime, just pay attention to the fact that if any decision has a value equal in magnitude to any potential, then this is the solution --- \bf{optimally}.

Fix some potential. We call an edge $(i,j)$ \bf{hard}, if:

$$ u[i] + v[j] = a[i][j]. $$

Consider the alternative formulation of the assignment problem, using the bipartite graph. Denote by $H$ is a bipartite graph composed only of hard edges. In fact, the Hungarian algorithm support for the current potential \bf{maximum number of edges of the matching $M$} of a graph $H$: and once this matching will contain $n$ edges, edges, matchings, and this will be the desired optimal solution (because it will be a solution whose value matches the value of the building).

Go directly to \bf{description of the algorithm}.

\ul{

\li In the beginning of the algorithm, the potential is assumed to be zero $u[i] = v[i] = 0$ and the matching $M$ relies empty.

\li Next, at each step of algorithm we try, without changing the potential to increase the capacity of the current matchings $M$ per unit (recall that a matching is searched in the column of the hard edges of $H$).

This is actually used for normal \algohref=kuhn_matching{algorithm Kuna finding maximum matchings in bipartite graphs}. Here we recall this algorithm.

All edges of the matchings $M$ are oriented in the direction from the second fraction to the first, all other edges of the graph $H$ are oriented in the opposite direction.

Recall (from terminology search matchings) that the vertex is called saturated if it is adjacent edge of the current matchings. The node that is not adjacent any edge of the current matchings, is called unsaturated. A path of odd length in which the first edge does not belong to the matching, and for all subsequent edges alternate (owned/not owned) --- called by increasing.

From all unsaturated vertices of the first share of the start bypass \algohref=dfs{depth}/\algohref=bfs{width}. If the bypass failed to reach an unsaturated vertex of the second fraction, then it means that we found the path increases from the first fraction of a second. If you proceedwith edges along this path (i.e. the first edge to be included in the matching, delete the second, third enable, etc.), thereby we will increase the capacity of matchings per unit.

If increasing there was no way, it means that the current matching $M$ --- as in a graph $H$, so in this case, proceed to the next step.

\li If the current step failed to increase the capacity of the current matchings, we performed a recalculation of the potential so that in later steps there are more opportunities for larger matchings.

Denote by $Z_1$ is a set of vertices of the first proportion that had been visited by the traversal algorithm Kuna when you search for magnifying circuit; through $Z_2$ --- the set of visited vertices of the second fraction.

Let's calculate $\Delta$:

$$ \Delta = \min_{i \in Z_1, j \notin Z_2} \{ a[i][j] - u[i] - v[j] \}. $$

This value is strictly positive.

(Proof. Suppose that $\Delta = 0$. Then there is a hard edge $(i,j)$, with $i \in Z_1$ and $j \notin Z_2$. From this it follows that the edge $(i,j)$ is supposed to be oriented from the second fraction to the first, i.e. it is rigid edge $(i,j)$ should be the matching $M$. However, this is impossible because we couldn't get into the saturated vertex $i$, but passing through the edge from $j$ to $i$. A contradiction, so $\Delta > 0$.)

Now, \bf{recalculate potential} as follows: for all vertices $i \in Z_1$ do $u[i] += \Delta$ and for all vertices $j \in Z_2$ --- will do $v[j] = \Delta$. The resulting potential will remain correct potential.

(Proof. For this we need to show that continued for all $i$ and $j$ is: $u[i] + v[j] \le a[i][j]$. For cases where $i \in Z_1 \& j \in Z_2$ or $i \notin Z_1 \& j \notin Z_2$ --- this is because the sum $u[i]$ and $v[j]$ are not changed. When $i \notin Z_1 \& j \in Z_2$ --- the inequality has only intensified. Finally, for the case $i \in Z_1 \& j \notin Z_2$ --- although the left side of the inequality increases, inequality remains unchanged, since the value of $\Delta$, as can be seen in its definition --- is the maximum increase that do not result in the violation of the inequality.)

In addition, the old matching $M$ of hard edges can be left, i.e. all edges of the matchings will remain tough.

(Proof. Hard to some edge $(i,j)$ has ceased to be rigid as a result of potential changes to the equality $u[i] + v[j] = a[i][j]$ into the inequality $u[i] + v[j] < a[i][j]$. However, the left part could be reduced only in one case: when $i \notin Z_1 \& j \in Z_2$. But since $i \notin Z_1$, it means that the edge $(i,j)$ could be an edge matchings that we wanted to prove.)

Finally, to show that the changes of potential \bf{cannot occur infinitely}, note that for each potential change, the number of vertices that are reachable by traversal, i.e. $|Z_1|+|Z_2|$, is strictly increasing. (This is not to say that increasing the number of hard edges.)

(Proof. First, any vertex that was reachable, attainable, and will remain. In fact, if a node is reachable, then to have some way of reachable vertices starting at the saturated top of the first lobe; and as for edges of the form $(i,j), i \in Z_1 \& j \in Z_2$, the sum $u[i] + v[j]$ is not changed, the entire path is saved and after changing the potential, which we wanted to prove. Secondly, we show that as a result of recalculation of potential at least one new reachable vertex. But this is almost obvious if we return to the definition of $\Delta$: the edge $(i,j)$, which reached the minimum, now becomes hard, which means that vertex $j$ will be achievable thanks to this rib and the top of $i$.)

Thus, there can be no more than $n$ recalculations of potential before I found the chain and increasing the capacity of matchings $M$ will be increased.

}

Thus, sooner or later will be found potential, which corresponds to perfect matching $M$, which is the answer to the problem.

If we talk about \bf{asymptotics} of the algorithm, then it is $O(n^4)$, because all should occur $n$ increases matchings, each of which occurs not more than $n$ recalculations of potential, each of which is performed in time $O(n^2)$.

Implementation of $O(n^4)$ we are here to lead will not, because it still will not be shorter than described below for the implementation of $O(n^3)$.


\h3{ development of an algorithm for $O(n^3)$ ($O(n^2 m)$) }

Learn now to implement the same algorithm for complexity $O (n^3)$ (for rectangular problems $n \times m$ --- $O(n^2 m)$).

Key idea: now we \bf{add to a review of the row of the matrix one-by-one} and not to consider them all at once. Thus, the above algorithm takes the form:

\ul{

\li Add to a review of the next row of the matrix $a$.

\li don't have increasing chain that starts in this string, recalculate the potential.

\li once turns increasing chain, we alternate the matching along it (including thereby the last row in the matching), and move on to the beginning (to the next line).

}

To achieve the desired asymptotics, we need to implement steps 2-3 executing for each row of the matrix, within time $O(n^2)$ (for rectangular problems --- for $O (n m)$).

To this end, we recall two facts proved above us:

\ul{

\li When the change of potential vertices that were reachable bypass Kuna, achievable and will remain.

\li All could happen only $O(n)$ scaling potential before you find the magnifying chain.

}

This implies \bf{key ideas}, which allows to achieve the required asymptotics:

\ul{

\li To check whether increasing the chain no need to run the bypass Kuna over again after each conversion potential. Instead, you can issue a bypass Kuna in \bf{iterative} form: after each recalculation of the potential we viewed the added hard edges, and if the left ends were achievable, mark their right ends as well as achievable and keep on going.

\li Developing this idea further, you can come to such idea of the algorithm: it is a cycle, at each step, which is first converted potential, then there is a column that has become attainable (and such always exists, since after checking the potential of a new reachable vertices), and if this column was peckish, we found a magnifying circuit, and if the column was full --- that corresponding to the matching string becomes achievable.

Now the algorithm takes the form: loop add columns, each of which first potential is recalculated and then a new column is marked as attainable.

\li To quickly calculate the potential (faster than the naive version for $O(n^2)$), it is necessary to support the subsidiary minima for each column $j$:

$$ minv[j] = \min_{i \in Z_1} \{ a[i][j] - u[i] - v[j] \}. $$

It is easy to see that the desired value of $\Delta$ is expressed through them as follows:

$$ \Delta = \min_{j \notin Z_2} \{ minv[j] \}. $$

Thus, finding $\Delta$ can now be made $O(n)$.

To support this array $minv[]$ when new rows are visited. This obviously can be done in $O(n)$ per added line (will give $O(n^2)$). Also update the array $minv[]$ have in terms of potential that also be done in time $O(n)$ for one conversion potential (because $minv[]$ is changed only for a near while columns: namely, is decreased by $\Delta$).

}

Thus, the algorithm takes the following form: in the outer loop we add in the consideration of rows of the matrix one after the other. Each line is executed in time $O(n^2)$, since this could happen only $O(n)$ scaling of the potential (each for time $O(n)$), which for a time $O(n^2)$ supported an array $minv[]$; the algorithm of Kuna in total will work out within time $O(n^2)$ (since it is in the form $O(n)$ iterations, each of which is visited by a new column).

The complexity is $O(n^3)$ --- or, if rectangular, $O(n^2 m)$.


\h3{ Implementation of the Hungarian algorithm for $O(n^3)$ ($O(n^2 m)$) }

The implementation was actually designed \bf{Andrei Lopatin} a few years ago. It is distinguished by amazing conciseness: the whole algorithm is placed in \bf{30 lines of code}.

This implementation looks for a solution for rectangular input matrices, $a[1 \ldots n][1 \ldots m]$, where $n \le m$. The matrix is stored in $1$-the indexing for the sake of convenience and conciseness. The fact is that in this implementation introduces a dummy zero row and zero column, allowing you to write many cycles in General, without additional checks.

Arrays $u[0 \ldots n]$ and $v[0 \ldots m]$ is stored the capacity. He initially zero, what is true for the matrix that consists of zero rows. (Note that this implementation is not important, or not available in the matrix $a[][]$ a negative number.)

The array $p[0 \ldots m] $ contains a matching: for each column $i = 1 \ldots m$ it stores the number of the selected row $p[i]$ (or $0$ if nothing is selected). $P[0]$ for convenience, the implementation is assumed to be the number of the current row under consideration.

Array $minv[1 \ldots m]$ contains for each column $j$ of the subsidiary minima, necessary for quick conversions building:

$$ minv[j] = \min_{i \in Z_1} \{ a[i][j] - u[i] - v[j] \}. $$

Array $way[1 \ldots m]$ contains information about where the minima are attained so that we are then able to recover the increasing chain. At first glance it seems that the array $way[]$ for each column, store the row number, and make another array: for each row to remember the column number from where we came. Instead, however, it is possible to notice that the algorithm kun always gets to the line passing through the edge matchings of the columns, so the row numbers for the recovery of the chain can always be taken from the matchings (i.e., from the array $p[]$). Thus, $way[j]$ for each column $j$ contains the number of the preceding column (or $0$ if there is no such thing).

The algorithm consists of an external \bf{loop over rows of a matrix}, inside which adds in consideration of $i$-th row of the matrix. The interior is a loop "do-while (p[j0] != 0)" which works, until you find a free column $j0$. Each iteration cycle marks visited new column with number $j0$ (calculated at the last iteration; and is initially equal to zero --- i.e. we start with a dummy column), as well as a new line $i0$ --- adjacent to it in the matching (i.e. $p[j0]$; and when $j0=0$ takes $i$-th line). Because of the emergence of new visited of the line $i0$ is necessary to properly count the array $minv[]$, at the same time we find the minimum in it --- the value of the $delta$, and where $j1$ this minimum has been achieved (note that this example makes $delta$ could be zero, which means that at the current step the potential can not be changed: a new column is achievable without). This is followed by recalculation of the potential $u[], v[]$, the corresponding change of the $minv[]$. At the end of the loop "do-while" we found increasing chain ending in a column $j0$, "spin" which can take an array of ancestors $way[]$.

The constant $INF$ is infinity, i.e. a number, obviously greater than all of the possible numbers in the input matrix $a[][]$.

\code
vector<int> u (n+1), v (m+1), p (m+1), way (m+1);
for (int i=1; i<=n; ++i) {
p[0] = i;
int j0 = 0;
vector<int> minv (m+1, INF);
vector<char> used (m+1, false);
do {
used[j0] = true;
int i0 = p[j0], delta = INF j1;
for (int j=1; j<=m; ++j)
if (!used[j]) {
int cur = a[i0][j]-u[i0]-v[j];
if (cur = minv[j])
minv[j] = cur, way[j] = j0;
if (minv[j] < delta)
delta = minv[j], j1 = j;
}
for (int j=0; j<=m; ++j)
if (used[j])
u[p[j]] += delta, v[j] -= delta;
else
minv[j] -= delta;
j0 = j1;
} while (p[j0] != 0);
do {
int j1 = way[j0];
p[j0] = p[j1];
j0 = j1;
} while (j0);
}
\endcode

Recovery of the response in a more familiar form, i.e. finding for each row $i = 1 \ldots n$ the number of the selected column in it $ans[i]$ is as follows:

\code
vector<int> ans (n+1);
for (int j=1; j<=m; ++j)
ans[p[j]] = j;
\endcode

The value of the found matchings can just take as zero the potential of the column (taken with the opposite sign). In fact, how easy it is to trace through the code, $v[0]$ contains the sum of all values of $delta$, i.e. the total change of potential. Although with every change of potential could change several of the variables $u[i]$ and $v[j]$, the total change in the magnitude of the potential is exactly equal to $delta$, since there is not chain increases, the number of reachable strings exactly one more than the number of reachable columns (only the current row $i$ has no "pair" in the visited column):

\code
int cost = v[0];
\endcode


\h2{ Examples }

We present here a few examples on the solution of the assignment problem, starting from the trivial, to less obvious tasks:

\ul{

\li Given a bipartite graph is required to find the matching \bf{maximum matching of minimum weight} (i.e., in the first place is maximized for the size of matchings, the second --- minimizing its cost).

To solve the problem just build on appointments, putting in place the missing ribs, the number "infinity". After this problem is solved by the Hungarian algorithm and delete from answer edges of infinite weight (they could enter a response if the task has no solutions in the form of perfect matchings).

\li Given a bipartite graph is required to find the matching \bf{maximum matching maximum weight}.

The solution is again obvious, but all the weight must be multiplied by minus one (either in the Hungarian algorithm to replace all the lows to the highs, and infinity for minus infinity).

\li Task \bf{detection of moving objects in images}: two images were produced, the results of which were received two sets of coordinates. Required to correlate the objects on the first and second picture, i.e. to determine for each point of the second picture, the first picture match. This requires to minimize the sum of distances between associated points (i.e., we are looking for a solution in which objects total passed the smallest way).

For solution, we just build and solve the problem about appointments, where the weights of edges are Euclidean distances between points.

\li Task \bf{detection of moving objects by locators}: there are two locator which can determine the position of an object in space, but only its direction. With both locators (located at various points) received information in the form of $n$ such areas. You want to determine the position of objects, i.e. determine the estimated position of objects and the corresponding pair of directions so as to minimize the sum of distances from objects to ray-directions.

Solution --- again, just build and solve the problem about appointments, where the first peaks are in the proportion of $n$ directions with the first locator, the second tops fraction --- $n$ from the second locator, and weights of edges are distances between the corresponding rays.

\li Coating \bf{a directed acyclic graph paths}: given a directed acyclic graph, it is required to find the smallest number of paths (with equal --- with the smallest total weight) to each vertex of the graph there would be exactly one path.

Solution --- given a graph construct corresponding bipartite graph and find the maximum matching of minimum weight. For more information, see \algohref=path_cover{separate article}.

\li \bf{Coloring wood}. Given a tree in which each vertex except the leaves has exactly $k-1$ sons. You want to choose for each vertex a color from some $k$ colors so that no two adjacent nodes have the same color. In addition, for each vertex of each colour is known and the cost of painting this top in this color and you want to minimize the total cost.

To solve use the method of dynamic programming. Namely, to compute the value of $d[v][c]$, where $v$ --- the number of vertices, $c$ --- the color number, and the value of $d[v][c]$ is the minimum cost of coloring vertex $v$ together with its descendants, and the vertex $v$ has color $c$. To find such a value $d[v][c]$, we have to distribute the remaining $k-1$ colors by the children of vertex $v$, and for this we must construct and solve the task of appointments (in which a vertex of one share --- color vertices other share --- peaks-sons, and the weight of the edges are the values of the respective speaker $d[][]$).

Thus, each value of $d[v][c]$ is the solution of the assignment problem, which ultimately gives the asymptotic $O(n k^4)$.

\li If the task assignment weight is set not at the edges, and at vertices, and only \bf{vertices of one beat}, it is possible to do without the Hungarian algorithm, but rather only to sort the top weight and perform normal \algohref=kuhn_matching{algorithm Kuna} (for more details see \algohref=vertex_weighted_matching{separate article}).

\li Examine the following \bf{a special case}. Let each vertex of the first share is assigned some number $\alpha[i]$, and each vertex of the second fraction --- $\beta[j]$. Let the weight of any edge $(i,j)$ equal to $\alpha[i] \cdot \beta[j]$ (the number $\alpha[i]$ and $\beta[j]$ is known to us). To solve the problem of appointments.

To resolve without of the Hungarian algorithm let us consider first the case when both lobes on two vertices. In this case, it is not difficult to verify, it is advantageous to connect the vertices in reverse order: the top with a smaller $\alpha[i]$ to connect to a vertex with a larger $\beta[j]$. This rule can easily be generalized to an arbitrary number of vertices: we need to sort the nodes of the first fraction in the order of increasing $\alpha[i]$, the second fraction --- in order of decreasing $\beta[j]$, and connect the vertices pairwise in that order. Thus, we get the solution with the asymptotic behavior of $O (n \log n)$.

\li \bf{the potential}. Given a matrix $a[1 \ldots n][1 \ldots m]$. You want to search two arrays $u[1 \ldots n]$ and $v[1 \ldots m]$ such that for any $i$ and $j$ is $u[i] + v[j] \le a[i][j]$, but the amount of array elements $u[]$ and $v[]$ a maximum.

Knowing the Hungarian algorithm, this task is not easy: the Hungarian algorithm just finds the potential $u[], v []$ that satisfies the equation. On the other hand, without knowledge of the Hungarian algorithm to solve this task seems almost impossible.

}



\h2{ Literature }

\ul{

\li \book{Ravindra Ahuja, Thomas Magnanti, James Orlin}{Network Flows}{1993}{ahuja_flows.djvu}

\li \book{Harold Kuhn}{The Hungarian Method for the Assignment Problem}{1955}

\li \book{James Munkres}{Algorithms for Assignment and Transportation Problems}{1957}

}



\h2{ Problem in online judges }

The list of tasks on the solution of the assignment problem:

\ul{

\li \href=http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=1687{UVA #10746 \bf {a"Crime Wave – The Sequel"} ~~~~ [difficulty: easy]}

\li \href=http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=1829{UVA #10888 \bf{"Warehouse"} ~~~~ [difficulty: medium]}

\li \href=http://acm.sgu.ru/problem.php?contest=0&problem=210{SGU #210 \bf{"Beloved Sons"} ~~~~ [difficulty: medium]}

\li \href=http://livearchive.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=1277{UVA #3276 \bf{"The Great Wall Game"} ~~~~ [difficulty: high]}

\li \href=http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=1237{UVA #10296 \bf{"Jogging Trails"} ~~~~ [difficulty: high]}

}
