
\h1{ Finding longest increasing subsequence }

\bf{problem statement} the following. Given an array of $n$ numbers: $a[0 \ldots n-1]$. You want to find in this sequence is strictly increasing subsequence of maximum length.

\bf{Formally} is as follows: you want to find a sequence of indices $i_1 \ldots i_k$ that:

$$ i_1 < i_2 < \ldots < i_k, $$
$$ a[i_1] < a[i_2] < \ldots < a[i_k]. $$

This article discusses various algorithms for solving this task, and some tasks that can be reduced to this problem.



\h2{ the Solution is $O(n^2)$: dynamic programming method }

Dynamic programming is a very General technique which allows to solve huge classes of problems. Here we consider this technique applied to our particular task.

Learn to look for \bf{length} longest increasing subsequence, and the subsequence recovery exists.


\h3{ Dynamic programming to find the response length }

For this, let us learn to count the array $d[0 \ldots n-1]$, where $d[i]$ is the length of the longest increasing subsequence ending in the element with index $i$. This array (it is --- the dynamics) we assume gradually: first $d[0]$, then $d[1]$ etc. In the end, when this array is calculated, the answer will be equal to the maximum in the array $d[]$.

Now, let the current index --- $i$, i.e. we want to calculate the value of $d[i]$, and all previous values of $d[0] 
\ldots d[i-1]$ counted. Then note that we have two options:

\ul{

\li $d[i] = 1$, i.e. the desired subsequence consists only of numbers $a[i]$.

\li $d[i] > 1$. Then the number $a[i]$ in the desired subsequence is a different number. Let's consider this number: it can be any element $a[j]$ $(j = 0 \ldots i-1)$ but such that $a[j] < a[i]$. Let us consider some current index $j$. Because the dynamics $d[j]$ are calculated, it turns out that this number $a[j]$ with the number $a[i]$ gives the answer $d[j] + 1$. Thus, $d[i]$ can be calculated according to this formula:

$$ d[i] = \max_{j=0 \ldots i-1, \atop a[j] < a[i]} ( d[j] + 1 ). $$

}

Combining these two versions into one, we obtain the final algorithm to compute $d[i]$:

$$ d[i] = \max \Big( 1, \max_{j=0 \ldots i-1, \atop a[j] < a[i]} ( d[j] + 1 ) \Big). $$

This algorithm --- is the very dynamics.


\h3{ Implementation }

Here is an implementation of the above algorithm, which finds and prints the length of the longest increasing subsequence:

\code
int d[MAXN]; // MAXN is a constant equal to the largest possible value of n

for (int i=0; i<n; ++i) {
d[i] = 1;
for (int j=0; j<i; ++j)
if (a[j] < a[i])
d[i] = max (d[i], 1 + d[j]);
}

int ans = d[0];
for (int i=0; i<n; ++i)
ans = max (ans, d[i]);
cout << ans << endl;
\endcode


\h3{ Restore response }

While we only have learned to look for the length of reply, but the longest subsequence we can't withdraw, because do not store any additional information about where the maximums are achieved.

To be able to restore the response, in addition to dynamics $d[0 \ldots n-1]$ must also store an auxiliary array $p[0 \ldots n-1]$, where dostigla maximum for each value of $d[i]$. In other words, the index $p[i]$ will denote the index $j$, which turned out to be the largest value of $d[i]$. (The array $p[]$ in dynamic programming is often called the "array of ancestors".)

Then, to print the answer, you just have to go from the item with maximum value $d[i]$ and according to his ancestors as long as we do not derive the entire subsequence, i.e., until we reach the element with a value of $d = 1$.


\h3{ Implementing recovery answer }

So, we are changing the dynamics of the code, and added code that produces the output of the longest subsequence (shown at the indices of the elements of the subsequence, in 0-indexing).

For convenience, we initially put an index $p[i] = -1$: for items where the dynamics appeared to be equal to unity, the value of the ancestor would remain a minus unit, which is a bit more comfortable. when you restore a response.

\code
int d[MAXN], p[MAXN]; // MAXN is a constant equal to the largest possible value of n

for (int i=0; i<n; ++i) {
d[i] = 1;
p[i] = -1;
for (int j=0; j<i; ++j)
if (a[j] < a[i])
if (1 + d[j] > d[i]) {
d[i] = 1 + d[j];
p[i] = j;
}
}

int ans = d[0], pos = 0;
for (int i=0; i<n; ++i)
if (d[i] > ans) {
ans = d[i];
pos = i;
}
cout << ans << endl;

vector<int> path;
while (pos != -1) {
path.push_back (pos);
pos = p[pos];
}
reverse (path.begin(), path.end());
for (int i=0; i<(int)path.size(); ++i)
cout << path[i] << ' ';
\endcode


\h3{ Alternative method of recovering the response }

However, as is almost always the case in dynamic programming, to restore the answer is not to keep an additional array of ancestors $p[]$, and simply re-calculating the current element dynamics and looking at what the index was to reach the maximum.

This method when implemented leads to a little more long code, but instead we get memory savings and the absolute coincidence of a logic program in process dynamics and in the recovery process.



\h2{ the Solution is $O (n \log n)$: dynamic programming binary search }

To obtain a faster solution of the problem, construct another variant of dynamic programming for $O (n^2)$, and then understand how can this option be accelerated to $O (n \log n)$.

\bf{Dynamics} now will be like this: let $d[i]$ $(i = 0 \ldots n)$ is the number that ends an increasing subsequence of length $i$ (and if there are several such numbers --- the least of them).

Initially we assume $d[0] = -\infty$, and all other elements of $d[i] = \infty$.

Take this momentum we will gradually, treating the number of $a[0]$, then $a[1]$, etc.

We present here a realization of this dynamics for $O (n^2)$:

\code
int d[MAXN];
d[0] = -INF;
for (int i=1; i<=n; ++i)
d[i] = INF;

for (int i=0; i<n; i++)
for (int j=1; j<=n; j++)
if (d[j-1] < a[i] && a[i] < d[j])
d[j] = a[i];
\endcode

Note now that these dynamics have one thing in \bf{a very important property}: $d[i-1] \le d[i]$ for all $i = 1 \ldots n$. Another property that every element $a[i]$ updates a maximum of one cell $d[j]$.

Thus, this means that processing of the next $a[i]$, we may $O (\log n)$ by making a binary search through the array $d[]$. In fact, we're just looking for in the array $d[]$ the first number, which is strictly larger than $a[i]$, and try to make an update of this element similarly to the above implementation.


\h3{ Implementation of $O (n \log n)$ }

Using the standard C++ binary search algorithm $upper\_bound$ (which returns the position of the first element strictly greater this), get a simple implementation:

\code
int d[MAXN];
d[0] = -INF;
for (int i=1; i<=n; ++i)
d[i] = INF;

for (int i=0; i<n; i++) {
int j = int (upper_bound (d.begin(), d.end(), a[i]) - d.begin());
if (d[j-1] < a[i] && a[i] < d[j])
d[j] = a[i];
}
\endcode


\h3{ Restore response }

In these dynamics, too it is possible to recover the answer, which again in addition to dynamics $d[i]$ also it is necessary to store an array of "ancestors" $p[i]$, the element with the index ends with an optimal subsequence of length $i$. In addition, for each element of the array $a[i]$ will have to keep his "ancestor" --- i.e., the index of the element that should precede $a[i]$ in the optimal subsequence.

Supporting these two arrays during the computation of the dynamics, in the end will not be difficult to re-establish the desired subsequence.

(It is interesting to note that, with respect to the dynamics of this response can only be restored through the array of ancestors --- and without them to recover the answer after the calculation of the dynamics will be impossible. This is one of the rare cases when the dynamics is not applicable to alternative method of recovery --- no array of ancestors).



\h2{ the Solution is $O (n \log n)$: data structures }

If the above method $O (n \log n)$ is very handsome, but not quite trivial conceptually, there is another way: use one of the well-known simple data structures.

In fact, let's go back to the very first dynamics, where the state was just the current position. The current value of the dynamics of $d[i]$ is computed as the maximum of the values of $d[i]$ among all such elements $j$, that $a[j] < a[i]$.

Therefore, if we are using $t[]$ let's denote such \bf{array}, which will write the values from the dynamics of the numbers:

$$ t[a[i]] = d[i], $$

it turns out that all we need to know is to look for \bf{maximum prefix} array $t$: $t[0 \ldots a[i]-1]$.

The problem of finding the maximum prefix of the array (since the array can vary) can be solved by many standard data structures, for example, \algohref=segment_tree{tree} or \algohref=fenwick_tree{a Bit}.

Using any such data structure, we obtain the solution for $O (n \log n)$.

This method of solution is explicit \bf{weaknesses}: the length and the complexity of this path is in any case worse than what is described above, the dynamics for $O (n \log n)$. In addition, if the input numbers $a[i]$ can be quite large, it is likely that they will have to compress (i.e. renumber from $0$ to $n-1$) --- without this, many standard data structures will not work due to high memory consumption.

On the other hand, the given path has a \bf{advantages}. Firstly, such decisions do not have to worry about the tricky dynamics. Secondly, this method allows to solve some generalizations of our problem (see below).



\h2{ Related problems }

Here are a few tasks that are closely related to the problem of finding the longest increasing subsequence.


\h3{ Longest non-decreasing subsequence }

In fact, it's the same problem, only now in the desired subsequences are allowed the same number (i.e. we have to find weakly increasing subsequence).

The solution to this problem is essentially no different from our original problem, just for comparison purposes will change the signs of the inequalities and it will be necessary to slightly modify the binary search.


\h3{ Number of longest increasing subsequences }

To solve this problem, one can use the dynamics for the first $O (n^2)$ or approach by using data structures to solve for $O (n \log n)$. And in fact, in that case, all changes consist only in the fact that in addition to the value of the dynamics of $d[i]$ must also store the number of ways this value could be obtained.

Apparently, the way to solve the dynamics using $O (n \log n)$ to this problem cannot be used.


\h3{ Smallest number-increasing subsequences that cover this sequence }

\bf{Condition} is as follows. Given an array of $n$ numbers $a[0 \ldots n-1]$. You want to paint it the number in the least number of colors so that each color would turn out-increasing subsequence.

\bf{Solution}. It is argued that the minimum number of colors equal to the length of the longest increasing subsequence.

\bf{the Proof}. In fact, we need to prove \bf{duality} of this problem and the problem of finding the longest increasing subsequence.

Denote by $x$ the length of the longest increasing subsequence, and using $y$ --- the required minimum number-increasing subsequences. We need to prove that $x=y$.

On the one hand, it is clear why can't be $y<x$: indeed, if we have $x$ strictly increasing elements, no two of them could get into one-increasing subsequence, which means that $y \ge x$.

Now we prove that, conversely, $y$ cannot be $> x$. Prove it by contradiction: suppose $y > x$. Then consider any optimal set of $y$ - increasing subsequences. Converted this set so: while there are two such subsequences that first starts before second, but first begins with a number larger or equal than the second --- unhook it from the starting number of the first subsequence and attach to the beginning of the second. Thus, after some nite number of steps we will have $y$ subsequences, with their starting numbers form an increasing subsequence of length $y$. But $y > x$, i.e. we have a contradiction (in fact, there can be long increasing subsequences of $x$).

Thus, indeed, $y = x$, what we wanted to prove.

\bf{Restore response}. It is alleged that the desired partition on a subsequence you can search greedily, i.e. going from left to right and assigning the current number to the subsequence, which now ends at the minimum number, greater than or equal to the current.



\h2{ Problem in online judges }

A list of tasks that can be solved on this topic:

\ul{

\li \href=http://informatics.mccme.ru/moodle/mod/statements/view3.php?chapterid=1793{MCCME #1793 \bf{"Largest increasing subsequence in O(n*log(n))"} ~~~~ [difficulty: easy]}

\li \href=http://community.topcoder.com/stat?c=problem_statement&pm=5922&rd=8075{TopCoder SRM 278 \bf{"IntegerSequence 500"} ~~~~ [difficulty: easy]}

\li \href=http://community.topcoder.com/stat?c=problem_statement&pm=3937&rd=6532{TopCoder SRM 233 \bf{"DIV2 1000 AutoMarket"} ~~~~ [difficulty: easy]}

\li \href=http://codeforces.EN/contest/76/problem/F{the all-Ukrainian school Olympiad in Informatics --- task F \bf {the Tourist} ~~~~ [difficulty: medium]}

\li \href=http://codeforces.ru/problemset/problem/10/D{Codeforces Beta Round #10 --- task D \bf{"NOWP"} ~~~~ [difficulty: medium]}

\li \href=http://acm.tju.edu.cn/toj/showp2707.html{ACM.TJU.EDU.CN 2707 \bf{"Greatest Common Increasing Subsequence"} ~~~~ [difficulty: medium]}

\li \href=http://www.spoj.pl/problems/SUPPER/{SPOJ #57 \bf{"SUPPER. Supernumbers in a permutation"} ~~~~ [difficulty: medium]}

\li \href=http://acm.sgu.ru/problem.php?contest=0&problem=521{ACM.SGU.RU #521 \bf{"North-East"} ~~~~ [difficulty: high]}

\li \href=http://community.topcoder.com/stat?c=problem_statement&pm=2967&rd=5881{2004 TopCoder Open --- Round 4 --- \bf{"1000. BridgeArrangement"} ~~~~ [difficulty: high]}

}













