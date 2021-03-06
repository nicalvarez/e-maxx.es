
\h1{ Finding all subpalindromes }


\h2{ problem Statement }

Given a string $s$ of length $n$. You want to find all such pairs $(i,j)$, where $i<j$, substring $s[i \ldots j]$ is a palindrome (i.e. reads the same from left to right and right to left).


\h3{ Refinement productions }

It is clear that in the worst case such substrings-palindromes can be $O(n^2)$, and at first glance it seems that the algorithm with linear asymptotic behavior can not exist.

However, information about the found palindromes to return more than \bf{compactly}: for each position $i=0 \ldots n-1$ we find $d_1[i]$ and $d_2[i]$, denoting the number of palindromes respectively odd and even length with the center at position $i$.

For example, in the string $s = abababc$ there are three odd length palindrome with center in $s[3]=b$, i.e. $d_1[3]=3$:

$$ a\ \overbrace{b\ a\ \underbrace{b}_{s_3}\ a\ b}^{d_1[3]=3}\ c $$

And in the string $s = cbaabd$ there are two even length palindrome with center in $s[3]=a$, i.e. the value of $d_2[3]=2$:

$$ c\ \overbrace{b\ a\ \underbrace{a}_{s_3}\ b}^{d_2[3]=2}\ d $$

I.e. the idea --- that if there is a subpalindromes of length $l$ centered at some position $i$, then there is also the subpalindromes of length $l-2$, $l-4$, etc. with centers in $i$. Therefore, two arrays $d_1[i]$ and $d_2[i]$ is sufficient to store the information about all the subpalindromes of this string.

Rather unexpected is the fact that there is a fairly simple algorithm that computes these "arrays of alendronate" $d_1[]$ and $d_2[]$ in linear time. This algorithm and is described in this article.


\h2{ Solution }

Generally speaking, this problem has several known solutions: use \algohref=string_hashes{hashing techniques} it can be solve in $O (n \log n)$, and using \algohref=ukkonen{suffix tree} and \algohref=lca_linear{fast algorithm LCA} this problem can be solved in $O (n)$.

However, as described in the present paper the method is considerably simpler and has smaller constants hidden in the asymptotic time and memory. This algorithm was open \bf{Managerom Glenn (Glenn Manacher)} in 1975


\h3{ Trivial algorithm }

To avoid ambiguities in further description, we mean what is "trivial algorithm".

This is the algorithm for searching answer at position $i$ over and over again it tries to increase the answer by one, each time comparing a few matching characters.

This algorithm is too slow, the whole answer, it can count only for a time $O (n^2)$.

Bring clarity to its implementation:

\code
vector<int> d1 (n) d2 (n);
for (int i=0; i<n; ++i) {
d1[i] = 1;
while (i-d1[i] >= 0 && i+d1[i] < n && s[i-d1[i]] == s[i+d1[i]])
++d1[i];

d2[i] = 0;
while (i-d2[i]-1 >= 0 && i+d2[i] < n && s[i-d2[i]-1] == s[i+d2[i]])
++d2[i];
}
\endcode


\h3{ Algorithm Manakara }

Learn finding all subpalindromes of odd length, i.e., to compute the array $d_1[]$; the solution for palindromes of even length (i.e., the finding of the $d_2[]$) will get a small modification of this.

For easy calculations we will support \bf{boundaries $(l,r)$} of the rightmost of the detected subpalindromes (i.e. subpalindromes with the largest value of $r$). Initially, it is possible to put $l=0, r=-1$.

So, suppose we want to compute the value of $d_1[i]$ to the next $i$, while all previous values of $d_1[]$ already counted.


\ul{

\li If $i$ is not in the current subpalindromes, i.e. $i > r$, then simply run the trivial algorithm.

I.e. incrementing the value of $d_1[i]$, and check every time --- true if the current substring $[i-d_1[i]; i+d_1[i]]$ is a palindrome. When we find the first discrepancy, or when we reach the boundaries of a string $s$ --- stop: we have finally counted the value of $d_1[i]$. After that, we should not forget to update the values for $(l,r)$.

\li now Consider the case when $i \le r$.

Let's try to extract some information from the already calculated values $d_1[]$. Namely, reflect the position of the $i$ inside the subpalindromes $(l,r)$, i.e. get the position $j = l + (r - i)$, and consider the value of $d_1[j]$. Since $j$ --- the position symmetrical to the position $i$, \bf{almost always} we can simply assign $d_1[i] = d_1[j]$. An illustration of this reflection (palindrome around $j$ is actually "copied" into a palindrome around $i$):

$$ \ldots \overbrace{s_l\ \ldots\ \underbrace{s_{j-d_1[j]+1}\ \ldots\ s_j\ \ldots\ s_{j+d_1[j]-1}}_{\rm palindrome}\ \ldots\ \underbrace{s_{i-d_1[j]+1}\ \ldots\ s_i\ \ldots\ s_{i+d_1[j]-1}}_{\rm palindrome}\ \ldots\ s_r\ \ldots}^{\rm palindrome} $$

However, there is a \bf{subtlety}, which must handle correctly: when "internal palindrome" reaches the external boundary or climbs for it, i.e. $j-d_1[j]+1 \le l$ (or, equivalently, $i+d_1[j]-1 \ge r$). Because the external boundaries of any palindrome symmetry is not guaranteed, we simply assign $d_1[i] = d_1[j]$ will be incorrect: we don't have enough information to assert that in position $i$ the subpalindromes has the same length.

Actually, to correctly handle these situations, it is necessary to "trim" the length of subpalindromes, i.e. assign $d_1[i] = r - i$. After that you should let the trivial algorithm that attempts to increase the value of $d_1[i]$ as possible.

An illustration of this case (it is a palindrome centered at $j$ is already shown "cropped" to such a length that it is placed in an external end-to-end palindrome):

$$ \ldots \overbrace{\underbrace{s_l\ to \ldots\ s_j\ \ldots\ s_{j+(j-l)}}_{\rm palindrome}\ \ldots\ \underbrace{s_{i-(r-i)}\ \ldots\ s_i\ \ldots\ s_r}_{\rm palindrome}}^{\rm palindrome}\ \underbrace{\ldots\ldots\ldots\ldots}_{\rm a try\ moving\ here} $$

(This illustration shows that, although the palindrome centered at position $j$ could have been longer beyond the outer palindrome, but in position $i$ we can use only the part which fits into the outer palindrome. But the response for item $i$ can be more than this part, so we have to run a trivial search, which will try to extend it beyond the outer palindrome, i.e. in the area "try moving here".)

}

To complete the algorithm just happened to recall that I should not forget to update the values for $(l,r)$, after computing the next values $d_1[i]$.

Also, we repeat that above we described reasoning to compute the array of odd palindromes $d_1[]$; for an array of even palindromes $d_2[]$ all reasoning is similar.


\h3{ evaluation of the asymptotics of the algorithm Manakara }

At first glance it is not obvious that this algorithm has linear complexity: when computing the answer to a certain position it often runs a trivial algorithm for finding palindromes.

However, a more careful analysis shows that the algorithm is still linear. (You should cite the well-known \algohref=z_function{an algorithm for constructing the Z-bar functions}, which is internally much like the algorithm, and also works in linear time.)

In fact, easily traced by the algorithm that each iteration produced a trivial finding, leads to an increase on one of the boundaries of $r$. With this reduction $r$ in the course of the algorithm cannot occur. Therefore, the trivial algorithm will make only $O(n)$ actions.

Given that, except for trivial searches, all the remaining parts of the algorithm Manakara clearly work in linear time, we obtain a total complexity: $O(n)$.


\h3{ implementation of the algorithm of Manakara }

For the case of subpalindromes of odd length, i.e., to compute the array $d_1[]$, we get code like this:

\code
vector<int> d1 (n);
int l=0, r=-1;
for (int i=0; i<n; ++i) {
int k = (i>r ? 0 : min (d1[l+r-i], r-i)) + 1;
while (i+k < n && i-k >= 0 && s[i+k] == s[i-k]) ++k;
d1[i] = k--;
if (i+k > r)
l = i-k, r = i+k;
}
\endcode

For subpalindromes of even length, i.e. for the calculation of the $d_2[]$, only slightly changing the arithmetic expression:

\code
vector<int> d2 (n);
l=0, r=-1;
for (int i=0; i<n; ++i) {
int k = (i>r ? 0 : min (d2[l+r-i+1], r-i+1)) + 1;
while (i+k-1 < n && i-k >= 0 && s[i+k-1] == s[i-k]) ++k;
d2[i] = k--;
if (i+k-1 > r)
l = i-k, r = i+k-1;
}
\endcode


\h2{ Problem in online judges }

A list of tasks that you can pass using this algorithm:

\ul{

\li \href=http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=2470{UVA #11475 \bf{"Extend to Palindrome"} ~~~~ [difficulty: easy]}

}
