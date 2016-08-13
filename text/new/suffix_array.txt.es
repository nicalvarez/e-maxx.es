\h1{ Suffix array }

Given a string $s[0 \ldots n-1]$ of length $n$.

$i$-th \bf{suffix} the string is called a substring $s[i \ldots n-1]$, $i=0 \ldots n-1$.

Then \bf{suffix array} of a string $s$ is called a permutation of the indices of suffixes $p[0 \ldots n-1]$, $p[i] \in [0;n-1]$, which specifies the order of suffixes in lexicographic sort order. In other words, you need to sort all suffixes of the given string.

For example, for the string $s=abaab$ suffix array will be equal to:

$$ (2,3,0,4,1) $$


\h2{ Build for $O (n \log n)$ }

Strictly speaking, the described below algorithm will not sort the suffixes, and \bf{cyclic shifts} of the row. However, this algorithm is easy to obtain and the algorithm for sorting suffixes: enough to attribute the end-of-line character, which is known to be less than any character, which may consist of a string (for example, it may be a dollar or sharp; in the C language can use existing null character).

Note that since we sorted cyclic shifts, and substrings we consider \bf{cyclic}: a substring $s[i \ldots j]$, when $i > j$, refers to the substring $s[i \ldots n-1] + s[0 \ldots j]$. In addition, all indices are taken modulo the length of the string (in order to simplify the formulas, I will omit explicitly taking the indices modulo).

The considered algorithm consists of about $\log n$ stages. On $k$-th phase ($k = 0 \ldots \lceil \log n \rceil$) sorted cyclic substrings of length $2^k$. At last, $\lceil \log n \rceil$-th phase, will be sorted substrings of length $2^{\lceil \log n \rceil} > n$, which is equivalent to sorting circular shifts.

At each phase of the algorithm in addition to the permutation $p[0 \ldots n-1]$ of indices of cyclic substrings will support for each of the cyclic substring starting at position $i$ with length $2^k$, \bf{number $c[i]$ the equivalence class}, which belongs to this substring. In fact, among the substrings can be identical, and the algorithm will need information about it. In addition, the numbers $c[i]$ of equivalence classes will give so that they are retained and information on the procedure: if the suffix is one less than the other, and the number of the class it needs to get smaller. Classes will for convenience be numbered from zero. The number of equivalence classes will be stored in the variable $\rm classes$.

Let us cite \bf{example}. Consider a string $s=aaba$. The values of the arrays $p[]$ and $c[]$ at each stage from zero on the second are as follows:

$$ \matrix{
0: & p=(0,1,3,2) & c=(0,0,1,0) \cr
1: & p=(0,3,1,2) & c=(0,1,2,0) \cr
2: & p=(3,0,1,2) & c=(1,2,3,0) \cr
} $$

It should be noted that in the array $p[]$ possible ambiguity. For example, at zero phase, the array would be: $p=(3,1,0,2)$. Then what option will work, depends on the specific implementation of the algorithm, but all variants are equally valid. At the same time, in the array $c[]$ no ambiguities could not be.

We will now build \bf{algorithm}. Input data:

\code
char *s; // input string
int n; // length of string

// constants
const int maxlen = ...; // maximum length of string
const int alphabet = 256; // size of the alphabet, <= maxlen
\endcode

To \bf{no phase} we need to sort cyclic substrings of length $1$, i.e. individual characters in the string, and divide them into equivalence classes (just the same characters should be referred to the same equivalence class). This can be done trivially, for example, sorting by counting. For each symbol, count how many times he has met. Then from this information reconstruct the array $p[]$. After that, iterating over array $p[]$ and comparing the characters, builds an array $c[]$.

\code
int p[maxlen], cnt[maxlen], c[maxlen];
memset (cnt, 0, alphabet * sizeof(int));
for (int i=0; i<n; ++i)
++cnt[s[i]];
for (int i=1; i<alphabet; i++)
cnt[i] += cnt[i-1];
for (int i=0; i<n; ++i)
p[--cnt[s[i]]] = i;
c[p[0]] = 0;
int classes = 1;
for (int i=1; i<n; ++i) {
if (s[p[i]] != s[p[i-1]]) classes++;
c[p[i]] = classes-1;
}
\endcode

Further, may we completed the $k-1$-th phase (i.e. calculated values of arrays $p[]$ and $c[]$ for it), now we will learn how $O(n)$ run \bf{next, $k$-th phase}. Since phases are only $O(\log n)$, this will give us the desired algorithm with time $O(n \log n)$.

To this end, note that a cyclic substring of length $2^k$ consists of two substrings of length $2^{k-1}$, which we can compare the $O(1)$ using the information from the previous phase --- number $c[]$ equivalence classes. Thus, substrings of length $2^k$, starting in position $i$, all necessary information is contained in the pair of numbers $(c[i], c[i+2^{k-1}])$ (again, we use the array $c[]$ from the previous phase).

$$ \ldots \overbrace{ \underbrace{ s_i \ldots s_{i+2^{k-1}-1} }_{{\rm length}=2^{k-1},{\rm class}=c[i]}\ \ \underbrace{ s_{i+2^{k-1}} \ldots s_{i+2^k-1} }_{{\rm length}=2^{k-1},\ {\rm class}=c[i+2^{k-1}]} }^{{\rm length}=2^k} \ldots \overbrace{ \underbrace{ s_j \ldots s_{j+2^{k-1}-1} }_{{\rm length}=2^{k-1},{\rm class}=c[j]}\ \ \underbrace{ s_{j+2^{k-1}} \ldots s_{j+2^k-1} }_{{\rm length}=2^{k-1},{\rm class}=c[j+2^{k-1}]} }^{{\rm length}=2^k} \ldots $$

This gives us a very simple solution: \bf{sort} of substrings of length $2^k$ is simply \bf {} that \bf{number of pairs}, and this will give us the required order, i.e. the array $p[]$. However, conventional sorting, the running time of $O(n \log n)$ will do is give the algorithm for constructing suffix array time $O(n \log^2 n)$ (but this algorithm is somewhat easier to write than described below).

How to quickly accomplish this sort of pairs? Because the pairs of elements do not exceed $n$, then you can sort by count. However, to achieve the best hidden in the asymptotic behavior of the constants instead of sorting couples will come to sorting just numbers.

We will use here a technique, which is based on the so-called \bf{digital sort}: sort the pairs, sort them first by the second elements, and then --- the first element (but definitely a stable sort, i.e. it does not violate the relative order of elements with equal). However, the latter items are already ordered --- this order is specified in the array $p[]$ from the previous phase. Then, to sort pairs by the second elements, need just from each element of the array $p[]$ take $2^{k-1}$ --- this will give us the sort order pairs on the second elements (because $p[]$ gives the ordering of the substrings of length $2^{k-1}$, and when you go to line twice the length of those substrings become their sweethearts, so the position of the second subtracted half the length of the first half).

Thus, using only subtractions from the elements of the array $p []$, we perform the sort on the second elements of pairs. Now it is necessary to produce a stable sort by the first elements of the pairs, it can be done in $O(n)$ using counting sort.

It remains only to count the number $c[]$ equivalence classes, but they are easy to get, simply passing along received a new permutation $p[]$ and comparing the adjacent elements (again, like comparing a pair of two numbers).

Let us cite \bf{implementation} the implementation of all phases of the algorithm, in addition to zero. Entered additional temporary arrays $pn$ and $cn$ ($pn$ --- contains the permutation in sorting order according to the second elements of pairs, $cn$ --- new numbers of equivalence classes).

\code
int pn[maxlen], cn[maxlen];
for (int h=0; (1<<h)<n; h++) {
for (int i=0; i<n; ++i) {
pn[i] = p[i] - (1<<h);
if (pn[i] < 0) pn[i] += n;
}
memset (cnt, 0, classes * sizeof(int));
for (int i=0; i<n; ++i)
++cnt[c[pn[i]]];
for (int i=1; i<classes; ++i)
cnt[i] += cnt[i-1];
for (int i=n-1; i>=0; --i)
p[--cnt[c[pn[i]]]] = pn[i];
cn[p[0]] = 0;
classes = 1;
for (int i=1; i<n; ++i) {
int mid1 = (p[i] + (1<<h)) % n, mid2 = (p[i-1] + (1<<h)) % n;
if (c[p[i]] != c[p[i-1]] || c[mid1] != c[mid2])
classes++;
cn[p[i]] = classes-1;
}
memcpy (c, cn, n * sizeof(int));
}
\endcode

This algorithm requires $O(n \log n)$ time and $O(n)$ memory. However, if we take into account size $k$ of the alphabet, the time becomes $O((n+k) \log n)$, and the size of memory --- $O(n+k)$.


\h2{ Application }


\h3{ Finding the smallest cyclic shift of the row }

The algorithm described above produces a sort of cyclic shifts (if the string is not to ascribe a dollar), and therefore $p[0]$ will give the desired position of the smallest cyclic shift. Time --- $O(n \log n)$.


\h3{ find substring in string }

Let you want in the text $t$ to search for a string $s$ in online (i.e. in advance of a string $s$ must be considered unknown). Build a suffix array for a text $t$ for $O (|t| \log |t|)$. Now the substring of $s$ will look as follows: note that the search entry should be the prefix of some suffix of $t$. Since the suffixes are ordered for us (this gives us a suffix array), then the substring $s$ can be searched by binary search on the suffix of the string. Comparison of the current suffix, and substring of $s$ inside the binary search it is possible to produce trivial $O(|p|)$. Then the asymptotic behavior of the search substring in the text becomes $O(|p| \log |t|)$.


\h3{ Comparison of two substrings of the string }

Required string $s$, after some preprocessing it, to learn how $O(1)$ to answer queries compare two arbitrary substrings (i.e., to verify that the first substring equal to/less than/more than second).

Build a suffix array for $O (|s| \log |s|)$, thus save the intermediate results: we will need the array $c[]$ from each phase. Therefore, the memory required is also $O (|s| \log |s|)$.

Using this information, we can in $O(1)$ to compare any two substrings of length equal to a power of two: it is enough to compare the numbers of equivalence classes of the corresponding phase. Now it is necessary to generalize this method on the substring of arbitrary length.

Let now received another request for comparison of two substrings of length $l$ with indices in $i$ and $j$. Find the greatest length of the block that fits inside the substrings of this length, i.e. the largest $k$ such that $2^k \le l$. Then the comparison of the two substrings can be replaced by comparison of two pairs of overlapping blocks of length $2^k$. first we compare the two blocks starting at positions $i$ and $j$, and if equality is to compare two blocks ending at positions $i+l-1$ and $j+l-1$:

$$ \ldots \overbrace{ \underbrace{ s_i \ldots s_{i+l-2^k} \ldots s_{i+2^k-1} }_{2^k} \ldots s_{i+l-1} }^{\rm first} \ldots \overbrace{ \underbrace{ s_j \ldots s_{j+l-2^k} \ldots s_{j+2^k-1} }_{2^k} \ldots s_{j+l-1} }^{\rm second} \ldots $$
$$ \ldots \overbrace{ s_i \ldots \underbrace{ s_{i+l-2^k} \ldots s_{i+2^k-1} \ldots s_{i+l-1} }_{2^k} }^{\rm first} \ldots \overbrace{ s_j \ldots \underbrace{ s_{j+l-2^k} \ldots s_{j+2^k-1} \ldots s_{j+l-1} }_{2^k} }^{\rm second} \ldots $$

Thus, the implementation is roughly like this (here it is considered that the calling procedure itself calculates $k$, since to do this in constant time is not so easy (apparently faster --- predpochla), but in any case it has no relation to the use of suffix array):

\code
int compare (int i, int j, int l, int k) {
pair<int,int> a = make_pair (c[k][i], c[k][i+l-(1<<k)]);
pair<int,int> b = make_pair (c[k][j], c[k][j+l-(1<<k)]);
return a == b ? 0 : a < b ? -1 : 1;
}
\endcode


\h3{ Greatest common prefix of two substrings: method with additional memory }

Required string $s$, after some preprocessing it, to learn $O(\log |s|)$ responding greatest common prefix (longest common prefix, lcp) for two arbitrary suffixes from positions $i$ and $j$.

The method described here requires $O (|s| \log |s|)$ additional memory; the other method uses linear amount of memory, but non-constant response time to the request that are described in the next section.

Build a suffix array for $O (|s| \log |s|)$, thus save the intermediate results: we will need the array $c[]$ from each phase. Therefore, the memory required is also $O (|s| \log |s|)$.

Let now another request: a pair of indices $i$ and $j$. Let's use what we can in $O(1)$ to compare any two substrings of length that is a power of two. To do this, let's take the power of two (from greatest to least), and to current extent check: if the substrings of this length match, then the answer is to add the powers of two and the greatest common prefix will continue to look to the right of the equal parts, i.e. $i$ and $j$ we need to add the current power of two.

Implementation:

\code
int lcp (int i, int j) {
int ans = 0;
for (int k=log_n; k>=0; --k)
if (c[k][i] == c[k][j]) {
ans += 1<<k;
i += 1<<k;
j += 1<<k;
}
return ans;
}
\endcode

Here $\rm log\_n$ is marked constant, equal to the logarithm of $n$ in base 2, rounded down.


\h3{ Greatest common prefix of two substrings: method no additional memory. The greatest common prefix of two adjacent suffixes }

Required string $s$, after some preprocessing it, to learn to answer the queries of greatest common prefix (longest common prefix, lcp) for two arbitrary suffixes from positions $i$ and $j$.

Unlike the previous method described here will perform the preprocessing of the string $O(n \log n)$ time with $O(n)$ memory. The result of this preprocessing will be an array (which in itself is an important source of information about the line, and therefore be used for other tasks). Replies to the inquiry will be made as the result of the query RMQ (a minimum interval, the range minimum query) in this array, therefore, when different implementations can be obtained as the logarithmic and constant time.

The basis for this algorithm is the following idea: find some way the greatest common prefix for each \bf{adjacent in the sorted order of suffixes of a pair}. In other words, build an array of ${\rm lcp}[0 \ldots n-2]$, where ${\rm lcp}[i]$ is equal to the greatest common prefix of the suffix of $p[i]$ and $p[i+1]$. This array will give us the answer for any two neighboring suffix in the string. Then the answer for any two suffixes, not necessarily adjacent, can be obtained by this array. In fact, let has received a request with some numbers suffix $i$ and $j$. Find the indices into the suffix array, i.e., let $k_1$ and $k_2$ --- their position in the array $p[]$ (arrange them, i.e. let $k_1 < k_2$). Then the answer to this query will be minimum in the array $\rm lcp$, drawn on the interval $[k_1; k_2-1]$. In fact, the transition from the suffix $i$ suffix to $j$ can be replaced by a chain of transitions beginning with the suffix $i$ and ending in the suffix $j$, but includes all the intermediate suffixes in the sorted order between them.

Thus, if we have such array $\rm lcp$, the answer to any request is the greatest common prefix is reduced to the query \bf{minimum on the interval} of the $\rm lcp$. This classical problem of minimum on an interval (range minimum query RMQ) has many solutions with different asymptotics described \algohref=rmq{here}.

So, our main task --- \bf{build} of the $\rm lcp$. To build it we will in the course of the algorithm for constructing suffix array: for each current iteration will build the array $\rm lcp$ for cyclic substrings of current length.

After iteration zero of the array $\rm lcp$, obviously, must be zero.

Suppose now that we have completed the $k-1$-th iteration, given an array of $\rm lcp^\prime$, and have the current $k$-th iteration to recalculate the array, getting its new value of $\rm lcp$. As we remember, in the algorithm for constructing suffix array cyclic substrings of length $2^k$ was divided in half into two substrings of length $2^{k-1}$; we will use this same technique for constructing the array $\rm lcp$.

Thus, suppose at the current iteration the algorithm for computing the suffix array has done its job, found a new value of the permutation $p[]$ substrings. We will now go through the array and look pair of adjacent substrings: $p[i]$ and $p[i+1]$, $i=0 \ldots n-2$. Splitting string in half, we get two different situations: 1) the first half of the substrings in the positions of $p[i]$ and $p[i+1]$ varies, and 2) the first half of the match (recall that such a comparison can be easily produced by simply comparing the class numbers $c[]$ from the previous iteration). Let us consider each of these cases separately.

