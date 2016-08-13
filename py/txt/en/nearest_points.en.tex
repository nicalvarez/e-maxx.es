\h1{ finding the pair of closest points }


\h2{ problem Statement }

Given $n$ points $p_i$ in the plane, defined by their coordinates $(x_i,y_i)$. You want to find among them such two points the distance between which is minimal:

$$ \min_{\scriptstyle i,j=0 \ldots n-1 \atop \scriptstyle i \ne j} \rho (p_i,not integer). $$

The distance we take the usual Euclidean:

$$ \rho(p_i,integer) = \sqrt{ (x_i-x_j)^2 + (y_i-y_j)^2 }. $$

A trivial algorithm -brute-force all-pairs and calculating the distance for each --- works for $O(n^2)$. The following describes the algorithm which works in time $O(n \log n)$. This algorithm was proposed by Preparatoy (Preparata), in 1975 the Drug and Samos also showed that the decision tree model this algorithm is asymptotically optimal.


\h2{ Algorithm }

We will construct the algorithm according to the General scheme of algorithms \bf{"divide-and-conquer"}: the algorithm is executed as a recursive function, which is passed the set of points; this recursive function splits the set in half, calls itself recursively for each half, and then performs some operations to combine the answers. The Union operation is to detect cases where one point of the optimal solution are in the same half, and another point --- in other (in this case recursive calls from each of the halves separately a couple to discover this, of course, can not). The main difficulty, as always, is to effectively execute this stage of the Association. If a recursive function is passed a set of $n$ points, then the stage of combining must work no more than $O(n)$, then the asymptotic behavior of the entire algorithm is $T(n)$ will be out of the equation:

$$ T(n) = 2 T(n/2) + O(n). $$

The solution of this equation is $T(n) = O (n \log n)$.

So, let's get to the construction algorithm. In order to come to effective implementation stage of the merger, to split the set of points on two will be according to their $x$-coordinates: in fact, we spend a certain vertical line, dividing the set of points into two subsets of about equal size. This partitioning conveniently be made as follows: sort the points as pairs of standard numbers, i.e.:

$$ p_i < integer \Longleftrightarrow (x_i < x_j) \lor \Bigl( (x_i = x_j) \land (y_i < y_j) \Bigr). $$

Then take the average after sorting the point $p_m$ ($m = \lfloor n/2 \rfloor$), and all points to her and the $p_m$ is attributed to the first half, and all points after it --- the second half:

$$ A_1 = \{ p_i\ |\ i = 0 \ldots m \}, $$
$$ A_2 = \{ p_i\ |\ i = m+1 \ldots n-1 \}. $$

Now, Visvaldis recursively from each of the sets $A_1$ and $A_2$, we can find the responses $h_1$ and $h_2$ for each half. Take the best of them: $h = \min (h_1, h_2)$.

Now we need to make \bf{phase Association}, i.e. try to find such pair of points the distance between which is less than $h$, and one point lies in $A_1$ and the other is in $A_2$. Obviously, it is enough to consider only those points that are spaced from the vertical straight section for a distance that is less than $h$, i.e., a set $B$ of the considered at this stage points is:

$$ B = \{ p_i\ |\ | x_i - x_m | < h \}. $$

For each point from the set $B$ you should try to find the points that are closer to her than $h$. For example, it is sufficient to consider only the points, the coordinate of $y$ which differs by not more than $h$. Moreover, it is not meaningful to consider those points whose $y$-coordinate $y$-coordinates of the current point. Thus, for each point $p_i$ we define the set of considered points $C(p_i)$ as follows:

$$ C(p_i) = \{ integer\ |\ integer \in B,\ \ y_i - h < y_j \le y_i \}. $$

If we sort the points of the set $B$ in $y$-coordinate, we find $C(p_i)$ is very easy: there are several points in a row to the point $p_i$.

So, in the new notation \bf{phase Association} as follows: construct the set $B$, sort it a point of $y$-coordinate, then for each point $p_i \in B$ consider all points $integer \in C(p_i)$ and each pair $(p_i,integer)$ to calculate the distance and compare with the current best distance.

At first glance, this is still a suboptimal algorithm: it seems that the sizes of the sets $C(p_i)$ are of order $n$, and the required asymptotics does not work. However, surprisingly, we can prove that the size of each of the sets $C(p_i)$ is the value $O(1)$, i.e. does not exceed some small constant irrespective of locations themselves. The proof is given in the next section.

Finally, pay attention to the sort that the above algorithm contains two: first, sort in pairs ($x$,$y$), and then sort the elements of the set $B$ on $y$. Actually, both of these sorts of inside a recursive function can be eliminated (otherwise we wouldn't have achieved the assessment to $O(n)$ for the stage of unification, and overall complexity of the algorithm would be $O(n \log^2 n)$). From the first sort easy to get --- enough in advance before the start of the recursion, to perform this sort: after all, the inside of recursion the elements themselves do not change, so there is no need to sort again. The second sort is a bit more complicated to implement its previously will not work. But, remembering \bf{merge-sort} (merge sort), who also works on the principle of divide-and-conquer, you can easily build this sort in our recursion. Let the recursion by taking some set of points (as we remember, the ordered pairs $(x,y)$) returns this set, but already sorted by coordinate $y$. To do this, simply perform a mail merge (for $O(n)$) of two results returned by recursive calls. Thereby sorted on $y$ many.


\h2{ the Evaluation of the asymptotics }

To show that the above algorithm is indeed $O(n \log n)$, we have to prove the following fact: $|C(p_i)| = O(1)$.

So, let us consider a point $p_i$; recall that the set $C(p_i)$ is the set of points $y$-coordinate which lies in the interval $[y_i-h; y_i]$, and, moreover, in the coordinate $x$ and the point $p_i$, and all points of the set $C(p_i)$ lie in the strip of width $2h$. In other words, the point $p_i$ and $C(p_i)$ lie in the rectangle of size $2h \times h$.

Our task is to estimate the maximum number of points that can lie in the rectangle $2h \times h$; thus we rate and maximum size of the set $C(p_i)$. Thus, when evaluating we must not forget that we can see repeating points.

Recall that $h$ was obtained from at least two results of the recursive calls --- from the sets $A_1$ and $A_2$ and $A_1$ contains points to the left of the dividing line and partially on it, $A_2$ --- remaining point of the line of section and points to the right. For any pair of points of $A_1$ and $A_2$, the distance cannot be less than $h$ --- or would that mean incorrectness recursive functions.

To estimate the maximum number of points in the rectangle $2h \times h$ will divide it into two squares $h \times h$, the first square will take all points $C(p_i) \cap A_1$ and the second --- all the rest, i.e. $C(p_i) \cap A_2$. From the above considerations it follows that in each of these squares, the distance between any two points is at least $h$.

We show that in each square \bf{four} points. For example, this can be done as follows: divide the square into 4 podgadat with sides $h/2$. Then in each of these subgrids can not be more than one point (because even the diagonal is $ $h / \sqrt{2}$, which is less than $h$). Therefore, all the square can not be more than 4 points.

So, we have proved that in the rectangle $2h \times h$ can't be larger than $4 \cdot 2 = 8$ points, and thus, the size of the set $C(p_i)$ does not exceed $7$, what we wanted to prove.


\h2{ the Implementation }

We introduce a data structure for storing the point (its coordinates and a number) and the comparison operators are required for two types of sorting:

\code
struct pt {
int x, y, id;
};

inline bool cmp_x (const pt & a, const pt & b) {
return a.x < b.x || a.x == b.x && a.y < b.y;
}

inline bool cmp_y (const pt & a, const pt & b) {
return a.y < b.y;
}

pt a[MAXN];
\endcode

For easy implementation of recursion we introduce the auxiliary function $upd\_ans()$, which will calculate the distance between two points and check whether this is the current response:

\code
double mindist;
int ansa, ansb;

inline void upd_ans (const pt & a, const pt & b) {
double dist = sqrt ((a.x-b.x)*(a.x-b.x) + (a.y-b.y)*(a.y-b.y) + .0);
if (dist < mindist)
mindist = dist, ansa = a.id, ansb = b.id;
}
\endcode

Finally, the implementation of the recursion. It is assumed that before calling the array $a[]$ is already sorted by $x$-coordinate. Recursion is passed two pointer $l$, $r$, which indicates that she needs to look for the answer for $a[l \ldots r]$. If the distance between $r$ and $l$ is too small, then the recursion must stop, and perform a trivial search algorithm of the nearest pair and then sort the subarray of the $y$-coordinate.

To merge two sets of points obtained from recursive calls, one (ordered by $y$-coordinate), we use the standard STL function $merge()$, and create an auxiliary buffer $t[]$ (one for all recursive calls). (Use $inplace\_merge()$ is impractical, because it basically does not work in linear time).

Finally, the set $B$ is stored in the array $t$.

\code
void rec (int l, int r) {
if (r - l <= 3) {
for (int i=l; i<=r; ++i)
for (int j=i+1; j<=r; ++j)
upd_ans (a[i], a[j]);
sort (a+l, a+r+1, &cmp_y);
return;
}

int m = (l + r) >> 1;
int midx = a[m].x;
rec (l, m) rec (m+1, r);
static t pt[MAXN];
merge (a+l, a+m+1, a+m+1, a+r+1, t, &cmp_y);
copy (t, t+r-l+1, a+l);

int tsz = 0;
for (int i=l; i<=r; ++i)
if (abs (a[i].x - midx) < mindist) {
for (int j=tsz-1; j>=0 && a[i].y - t[j].y < mindist; --j)
upd_ans (a[i], t[j]);
t[tsz++] = a[i];
}
}
\endcode

Incidentally, if all the coordinates are integers, while recursion can never move on to fractional quantities, and store in $mindist$ the square of the minimum distance.

In the main program to call the recursion goes as follows:

\code
sort (a, a+n, &cmp_x);
mindist = 1E20;
rec (0, n-1);
\endcode



\h2{ a Generalization of: finding a triangle with minimal perimeter }

The algorithm described above is generalized and interesting to this problem: among a given set of points to choose three different points so that the sum of pairwise distances between them was minimal.

In fact, to solve this problem, the algorithm remains the same: we divide the field into two halves of a vertical line called the solution recursively for both halves, choose a minimum of $minper$ of the found perimeters, building a strip thickness $minper / 2$, and iterate over all triangles that can improve the answer. (Note that a triangle with perimeter $\le minper$ longest side $\le minper/2$.)



\h2{ Problem in online judges }

The list of tasks that boil down to finding the two nearest points:

\ul{

\li \href=http://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=1186{ UVA 10245 \bf{"The Closest Pair Problem"} ~~~~~~ [difficulty: easy] }

\li \href=http://www.spoj.pl/problems/CLOPPAIR/{ SPOJ #8725 CLOPPAIR \bf{"Closest Point Pair"} ~~~~~~ [difficulty: easy] }

\li \href=http://codeforces.EN/contest/120/problem/J{ CODEFORCES Team school Olympiad in Saratov - 2011 \bf{"Minimum"} ~~~~~~ [difficulty: medium] }

\li \href=http://code.google.com/codejam/contest/311101/dashboard#s=a&a=1{ Google CodeJam 2009 Final \bf{"Min Perimeter"} ~~~~~~ [difficulty: medium] }

\li \href=https://www.spoj.pl/problems/CLOSEST/{ SPOJ #7029 CLOSEST \bf{"Closest Triple"} ~~~~~~ [difficulty: medium] }

}
