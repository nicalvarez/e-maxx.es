\h1{ Z-function of the line and its computation }

Given string $s$ of length $n$. Then \bf{Z-function} ("z-function") from this string is an array of length $n$, $i$-th element which is equal to the largest number of characters, starting at position $i$ coincides with the first characters of the string $s$.

In other words, $z[i]$ is the greatest common prefix of the string $s$ and $i$-th suffix.

\bf{note}. In this article, to avoid ambiguity, we will assume the string is 0-indexed --- i.e. the first character of a string has index $0$, and the last --- $n-1$.

The first element of Z-functions, $z[0]$, is generally considered uncertain. In this article we'll assume that it is zero (although neither in the algorithm nor in the implementation it changes nothing).

In this article an algorithm for computing the Z-function at time $O (n)$, as well as various applications of this algorithm.


\h2{ Examples }

Let us cite for example the calculated Z-function for multiple rows:

\ul{

\li $"aaaaa"$:

$$ z[0] = 0, $$
$$ z[1] = 4, $$
$$ z[2] = 3, $$
$$ z[3] = 2, $$
$$ z[4] = 1. $$

\li $"aaabaab"$:

$$ z[0] = 0, $$
$$ z[1] = 2, $$
$$ z[2] = 1, $$
$$ z[3] = 0, $$
$$ z[4] = 2, $$
$$ z[5] = 1, $$
$$ z[6] = 0. $$

\li $"abacaba"$:

$$ z[0] = 0, $$
$$ z[1] = 0, $$
$$ z[2] = 1, $$
$$ z[3] = 0, $$
$$ z[4] = 3, $$
$$ z[5] = 0, $$
$$ z[6] = 1. $$

}


\h2{ a Trivial algorithm }

A formal definition can be presented in the following basic implementation of $O (n^2)$:

\code
vector<int> z_function_trivial (string s) {
int n = (int) s.length();
vector<int> z (n);
for (int i=1; i<n; ++i)
while (i + z[i] < n && s[z[i]] == s[i+z[i]])
++z[i];
return z;
}
\endcode

We just for each position $i$ to be searched the answer for $z[i]$, starting from scratch, and until then, until we find a mismatch or reach the end of the row.

Of course, this implementation is too inefficient, we turn now to the construction of an effective algorithm.


\h2{ an Efficient algorithm to compute Z-function }

To obtain an efficient algorithm that will calculate the values $z[i]$, as - $i=1$ to $n-1$, and thus we will try another when calculating the value $z[i]$ maximum use of already calculated values.

We will call for brevity a substring that matches a prefix of the string $s$, \bf{interval of convergence}. For example, the value of the desired Z-function of $z[i]$ --- this is the longest stretch of matches, starting in position $i$ (and end it will be at position $i + z[i] - 1$).

This will support \bf{the coordinates of $[l;r]$ the rightmost segment match}, i.e., all detected line segments will retain the one that ends more to the right. In a sense, the index $r$ is a boundary to which our line has already been scanned by the algorithm, and everything else --- it is not yet known.

Then if the current index for which we want to calculate the next value of the Z-function is $i$, we have one of two options:

\ul{

\li $i > r$ --- i.e. the current position is \bf{outside} the fact that we have already processed.

Then we seek $z[i]$ \bf{a trivial algorithm}, i.e. takes the value $z[i]=0$, $z[i]=1$, etc. note that in the end, if $z[i]$ will be $>0$, then we must update the coordinates of the rightmost line segment $[l;r]$ --- because $i + z[i] - 1$ is guaranteed to be greater than $r$.

\li $i \le r$ --- i.e. the current position lies inside the interval of convergence $[l;r]$.

Then we can use already calculated \bf{previous} Z-functions to initialize the value of $z[i]$ is not null, and some as many as possible.

To this end, note that the substring $s[l \ldots r]$ and $s[0 \ldots r-l]$ \bf{match}. This means that as the initial approximation for $z[i]$ can take the value of cut $s[0 \ldots r-l]$, namely, the value $z[i-l]$.

However, the value $z[i-l]$ can be too large: so that when you apply it to position $i$ it "come out" beyond the boundaries of $r$. This is unacceptable, because about the characters to the right of $r$ we don't know anything, and they can be different from the desired.

Let us cite \bf{example} this situation, the example line:

$$ "aaaabaa" $$

When we get to the last position ($i=6$), the current rightmost interval will be $[5;6]$. $6$ with this cut will correspond to position $6-5=1$, the answer which is $ $z[1] = 3$. It is obvious that this value is to initialize $z[6]$ is impossible, it is completely incorrect. High, what value we can initialize - - - $1$ because it is the largest value that climbs outside of the segment $[l;r]$.

Thus, as \bf{initial value} for $z[i]$ only safe to follow this expression:

$$ z_0[i] = \min (r-i+1, z[i-l]). $$

Preinitializing $z[i]$ the value $z_0[i]$, we then act again \bf{a trivial algorithm} --- because after the boundary of $r$, generally speaking, could be detected the continuation of a segment match, to predict that only previous values of the Z-functions we could not.

}

Thus, the whole algorithm consists of two cases which actually differ only in \bf{initial value} $z[i]$: in the first case it is assumed to be zero, and the second --- is determined by the previous values using the following formula. After that both branches of the algorithm are reduced to the implementation of \bf{a trivial algorithm} which starts with specified initial value.

The algorithm is very simple. Despite the fact that each $i$ in it anyway is a trivial algorithm --- we have made considerable progress in getting the algorithm working in linear time. Why this is so, consider the below, after we present the algorithm implementation.


\h2{ the Implementation }

The implementation is quite concise:

\code
vector<int> z_function (string s) {
int n = (int) s.length();
vector<int> z (n);
for (int i=1, l=0, r=0; i<n; ++i) {
if (i <= r)
z[i] = min (r-i+1, z[i-l]);
while (i+z[i] < n && s[z[i]] == s[i+z[i]])
++z[i];
if (i+z[i]-1 > r)
l = i, r = i+z[i]-1;
}
return z;
}
\endcode

Comment on this implementation.

All the decision is issued in the form of the function that the line returns an array of length $n$ --- computed Z-function.

Array $z[]$ initially is filled with zeros. Current the rightmost segment of a coincidence to be equal to $[0;0]$, i.e. deliberately small segment, which will not get any $i$.

Inside the loop $i = 1 \ldots n-1$ we first the above algorithm is determined by the initial value $z[i]$ --- it will either remain zero or vicikitsa based on the above formula.

After that, the trivial algorithm that tries to increase the value $z[i]$ as much as possible.

At the end of the current upgrading of the rightmost match segment $[l;r]$, of course, if this is required --- i.e., if $i+z[i]-1 > r$.


\h2{ the Asymptotic behavior of the algorithm }

Let us prove that the above algorithm runs in linear relative to the length of the line time, i.e. $O (n)$.

The proof is very simple.

We are interested in nested loop $\rm while$ --- as everything else --- only const operations performed $O (n)$ times.

We will show that \bf{each iteration} this loop $\rm while$ will increase the right border $r$ per unit.

For this we consider both branches of the algorithm:

\ul{

\li $i > r$

In this case, any loop $\rm while$ 't do a single iteration (if $s[0] \ne s[i]$), or do several iterations, each time moving one character to the right, starting at position $i$, and after that --- right border $r$ will be updated.

Since $i > r$, then we have that indeed, each iteration of the loop increments the new value of $r$ per unit.

\li $i \le r$

In this case, we follow the formula we initialize the value of $z[i]$ for some number $z_0$. Compare this initial value $z_0$ with magnitude $r-i+1$, we get three options:

\ul{

\li $z_0 < r-i+1$

Let us prove that in this case, a single iteration of the loop $\rm while$ 't do it.

It is easy to prove, for example, on the contrary, if the cycle $\rm while$ has made at least one iteration, it would mean that a certain us the value of $z_0$ was inaccurate, this is less than the length of the match. But because the string $s[l \ldots r]$ and $s[0 \ldots r-l]$ are the same, then it means that the position of $z[i-l]$ is invalid value is less than it should be.

Thus, in this embodiment, the variable $z[i-l]$ and from the fact that it is less than $r-i+1$, it follows that this value coincides with the target value of $z[i]$.

\li $z_0 = r-i+1$

In this case, the cycle $\rm while$ may perform several iterations, however, each of them will lead to the increase of the value of $r$ per unit: because the first compared character will be $s[r+1]$, which emerges beyond the segment $[l;r]$.

\li $z_0 > r-i+1$

This option is essentially impossible, because the definition of $z_0$.

}

}

Thus, we have proved that each iteration of a nested loop leads to the promotion of index $r$ to the right. Since $r$ could not be more than $n-1$, this means that this loop will make no more than $n-1$ iterations.

Since all the rest of the algorithm obviously works for $O (n)$, then we have proved that the whole algorithm for calculation of Z-function in linear time.



\h2{ Application }

Consider a few applications of Z-function to solve specific tasks.

These applications are similar to applications \algohref=prefix_function{prefix-function}.


\h3{ find substring in string }

In order to avoid confusion, let's call one line \bf{text} $t$, another --- \bf{example} $p$. Thus, the task is to find all occurrences of the pattern $p$ in a text $t$.

To solve this problem formed by the line $s = p + \# + t$, i.e. to the sample we assign the text after the delimiter character (which is not found anywhere in the string).

Calculate for the rows Z-function. Then for any $i$ in the interval $[0; length(t)-1]$ in the corresponding value of $z[i + length(p) + 1]$ can be understood, if the pattern $p$ in a text $t$, starting at position $i$: if the value of the Z-function equal to $length(p)$, then Yes, it is, otherwise it isn't.

Thus, the asymptotic behavior of the solution turned out to be $O (length(t) + length(p))$. The memory consumption has the same asymptotic behavior.


\h3{ Number of different substrings in the string }

Given a string $s$ of length $n$. You want to count the number of its distinct substrings.

We solve this problem iteratively. Namely, learn by knowing the current count of different substrings, recalculate this amount when added to the end of one symbol.

So, let $k$ --- the current number of distinct substrings of $s$, and we add to the end of the symbol $c$. Obviously, the result could be some new substrings ending in this new character $c$ (namely, all the strings ending with the symbol, but not seen before).

Take the line $t=s+c$ and invert it (write the characters in reverse order). Our task is to count the number of rows of $t$ such prefixes, are not found in it elsewhere. But if we count for the row $t$ Z-function and find its maximum value $z_{\rm max}$, then, obviously, in the string $t$ occurs (not at the beginning) its prefix of length $z_{\rm max}$, but not greater length. Clearly, the prefixes of shorter length already just found it.

Thus we have that the number of new substrings that appear when appending symbol $c$, equals $len - z_{\rm max}$, where $len$ --- the current length of the string after ascribing the symbol $c$.

Therefore, the time complexity for strings of length $n$ is $O (n^2)$.

It is worth noting that quite similarly we can calculate in $O (n)$ the number of distinct substrings and the appending of the symbol in the beginning and when you remove character from the end or from the beginning.


\h3{ row Compression }

Given a string $s$ of length $n$. You want to find the shortest its "compressed" representation, i.e. to find a line $t$ of minimum length that $s$ can be represented as a concatenation of one or more copies of $t$.

For the solution calculate the Z-line function of $s$, find the first position of $i$ such that $i + z[i] = n$ and $n$ is divisible by $i$. Then the string $s$ can be reduced to strings of length $i$.

The proof of this solution is practically identical to the proof of the solution by using \algohref=prefix_function{prefix-function}.



\h2{ Problem in online judges }

A list of tasks that can be solved using Z-function:

\ul{

\li \href=http://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=396{UVA #455 \bf{"Periodic Strings"} ~~~~ [difficulty: medium]}

\li \href=http://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=1963={UVA #11022 \bf{"String Factoring"} ~~~~ [difficulty: medium]}

}
