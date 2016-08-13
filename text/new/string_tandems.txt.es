\h1{ Search all tandem repeats in a string. The Algorithm Meina-Lorentz }

Given a string $s$ of length $n$.

\bf{Tandem repeats} (tandem repeat) in it are called two occurrences of any substring in a row. In other words, the tandem repeat is described by a pair of indices $i < j$ such that the substring $s[i \ldots j]$ is two identical lines written in a row.

The problem is that \bf{to find all tandem repeats}. Simplified versions of this problem: to find \bf{any} tandem repeat or find \bf{longest} tandem repeat.

\bf{note}. To avoid confusion, all rows in the article we will assume to be 0-indexed, i.e. the first character of a string has index 0.

The algorithm described here was published in 1982, Mayne and Lorenz (see references).


\h2{ Example }

Consider the tandem repeats in the example a simple string, for example:

$$ "acababaee" $$

This line contains the following tandem repeats:

\ul{
\li $[2;5] = "abab"$
\li $[3;6] = "baba"$
\li $[7;8] = "ee"$
}

Another example:

$$ "abaaba" $$

There are only two tandem repeat:

\ul{
\li $a[0;5] = "abaaba"$
\li $[2;3] = "aa"$
}


\h2{ the Number of tandem repeats }

Generally speaking, the tandem repeats in a string of length $n$ can be of order $O(n^2)$.

An obvious example is the string composed of $n$ identical letters --- in this line of a tandem repeat is any sub-string of even length, which are approximately $n^2 / 4$. In General, any periodic string with a short period will contain many tandem repeats

On the other hand, by itself this fact does not preclude the existence of an algorithm with an asymptotic $O (n \log n)$, because the algorithm may grant tandem repeats in a particular condensed form, in groups of several pieces at once.

Moreover, there is the concept of \bf{series} --- four numbers that describe the whole group of the periodic substrings. It has been proven that the number of runs in any string linearly with respect to the length of the string.

However, the algorithm described below does not use the concept of the series, so we will not detail this concept.

Here are other interesting results related to the number of tandem repeats:

\ul{

\li it is Known that if we consider only the primitive tandem repeats (i.e., half of which are not multiples of rows) their number in any row --- $O (n \log n)$.

\li If to encode tandem repeats three numbers (called triples Crochemore (Crochemore)) $(i,p,r)$ (where $i$ --- the starting position, $p$ --- the length of the repeating substring, $r$ --- number of repeats), all tandem repeats of any string can be output using $O (n \log n)$ such triples. (Exactly the result obtained at the output of the algorithm Crochemore finding all tandem repeats.)

\li a Fibonacci String, defined as follows:

$$ t_0 = b $$
$$ t_1 = a, $$
$$ t_i = t_{i-1} + t_{i-2}, $$

are "strongly" periodic.

The number of tandem repeats in the $i$-th Fibonacci string of length $f_i$, even compressed triples Crochemore is $O (f_n \log f_n)$.

The number of primitive tandem repeats in the Fibonacci string --- also is of order $O (f_n \log f_n)$.

}


\h2{ Algorithm Meina-Lorentz }

The idea of the algorithm Mein-pretty standard Lorentz: this is an algorithm \bf{"divide-and-conquer"}.

Briefly it is that the original row is split in half, the solution is started from each of the two halves separately (thus we find all tandem repeats, which are located only in the first or in the second half). Next comes the most difficult part is finding tandem repeats that start in the first half and ending the second (we call such tandem repeats for convenience \bf{crossing}). How exactly this is done --- is the very essence of the algorithm Meina-Lorentz; this we describe in detail below.

The asymptotic behavior of the algorithm "divide-and-conquer" is a well researched. In particular, it is important for us that if we learn to look for crossing tandem repeats in a string of length $n$ for $O(n)$, then the complexity of the whole algorithm will succeed $O (n \log n)$.


\h3{ Search traversing tandem repeats }

So, the algorithm main-Lorentz came down to the fact that for a given string $s$ to learn how to find all intersecting tandem repeats, i.e. those that begin in the first half of the row, and end with --- in the second.

Denote by $u$ and $v$ the two halves of the string $s$:

$$ s = u + v $$

(their length is approximately equal to the length of the string $s$, divided in half).


\h4{ Right and left tandem repeats }

Consider an arbitrary tandem repeat and look at its Central character (more precisely, the symbol, which begins the second half of the tandem; i.e., if a tandem repeat is a substring $s[i \ldots j]$, then the average symbol $(i+j+1)/2$.

We'll call tandem repeat \bf{left or right} depending on where the symbol --- in the row of $u$ in $v$. (You can say so: tandem repeats known as the left, if most of it lies in the left half of the string $s$; otherwise --- a tandem repeat is called a right.)

Learn to look for \bf{all the left tandem repeats}; for the right it will be the same.


\h4{ Central position $cntr$ of tandem repeat }

We denote the length of the desired left tandem repeat using $2k$ (i.e. the length of each half of tandem repeat --- it $k$). Consider the first character of tandem repeat, entering the line $v$ (it is in the string $s$ at position $length(u)$). It coincides with the character standing on $k$ positions before him; let us denote this position through $cntr$.

\bf{to Search for all tandem repeats we will be, going through this position $cntr$}: i.e. first find all tandem repeats with a single value of $cntr$, then another value, etc. - - - going through all possible values $cntr$ from $0$ to $length(u)-1$.

\bf{Example} consider the following line:

$$ s = "cac|ada" $$

(the pipe symbol separates the two halves of $u$ and $v$)

Tandem repeat $"caca"$ contained in the string is detected when we will view the value of $cntr = 1$ --- because it is in position $1$ is the character 'a', coinciding with the first character of tandem repeat, caught in the half of $v$.


\h4{ the Criterion of the presence of tandem repeat with a given center $cntr$ }

So, we must learn to fixed the value of $cntr$ to quickly search for all tandem repeats corresponding thereto.

We have the following scheme (for an abstract line, which contains a tandem repeat $"abcabc"$):

$$$
\setlength{\unitlength}{2mm}

\begin{picture}(30,20)

\linethickness{0.075 mm}
\put(0,10)%
{\line(0,1){2}}
\put(30,10)%
{\line(0,1){2}}
\put(0,10)%
{\line(1,0){30}}
\put(0,12)%
{\line(1,0){30}}

\put(10.5,10)%
{\line(0,1){2}}
\put(12,10)%
{\line(0,1){2}}
\put(11.25,6.1)%
{\vector(0,1){3.4}}
\put(10.5,5)%
{$cntr$}

\linethickness{0.4 mm}
\put(of 15.10)%
{\line(0,1){2}}
\linethickness{0.075 mm}

\put(9.3,10.5)
{a}
\put(10.8,10.5)
{b}
\put(12.3,10.5)
{c}
\put(13.8,10.5)
{a}
\put(15.3,10.5)
{b}
\put(16.8,10.5)
{c}

\put(12,12.5)%
{\oval(3,0.6)[t]}
\put(11.5,13.5)%
{$l_2$}
\put(16.5,12.5)%
{\oval(3,0.6)[t]}
\put(16,13.5)%
{$l_2$}

\put(9.75,9.5)%
{\oval(1.5,0.6)[b]}
\put(9.1,7.5)%
{$l_1$}
\put(14.25,9.5)%
{\oval(1.5,0.6)[b]}
\put(13.6,7.5)%
{$l_1$}

\end{picture}
$$$

Here in $l_1$ and $l_2$ we have identified the lengths of two pieces of tandem repeat: the $l_1$ is the length of the tandem repeat until $cntr-1$, and $l_2$ is the length of the tandem repeat from $cntr$ until the end of the halves of the tandem repeat. Thus, $l_1+l_2+l_1+l_2$ is the length of tandem repeat.

Looking at this picture, you can understand that \bf{necessary and sufficient}, with center at position $cntr$ is a tandem repeat of length $2 l = 2 (l_1 + l_2) = 2 (length(u) - cntr)$, is the following condition:

\ul{

\li Let $k_1$ is the largest number such that $k_1$ of the characters before position $cntr$ coincide with the last $k_1$ by a string $u$:

$$ u[ cntr-k_1 \ldots cntr-1 ] == u[ length(u)-k_1 \ldots length(u)-1 ]. $$

\li Let $k_2$ is the largest number such that $k_2$ of characters from position $cntr$, match the first $k_2$ by the characters of the string $v$:

$$ u[ cntr \cntr ldots+k_2-1] == v[ 0 \ldots k_2-1 ]. $$

\li Then to be performed.

$$ \cases{
l_1 \le k_1, \cr
l_2 \le k_2.
} $$

}

This criterion can \bf{reformulated} in this way. Let's fix a particular value of $cntr$, then:

\ul{

\li All tandem repeats, which we will now discover, will have length $2 l = 2 (length(u) - cntr)$.

However, such tandem repeats can be \bf{multiple}: it depends on the choice of the lengths of the pieces of $l_1$ and $l_2 = l - l_1$.

\li going to Find $k_1$ and $k_2$, as described above.

\li Then appropriate will be tandem repeats, for which pieces of length $l_1$ and $l_2$ satisfy the conditions:

$$ \cases{
l_1 + l_2 = l = length(u) - cntr, \cr
l_1 \le k_1, \cr
l_2 \le k_2.
} $$

}


\h4{ an Algorithm for finding the length $k_1$ and $k_2$ }

So, the whole problem boils down to a quick calculation of length $k_1$ and $k_2$ for each value $cntr$.

Let us recall their definitions:

\ul{

\li $k_1$ is the maximum nonnegative integer for which:

$$ u[ cntr-k_1 \ldots cntr-1 ] == u[ length(u)-k_1 \ldots length(u)-1 ]. $$

\li $k_2$ is the maximum nonnegative integer for which:

$$ u[ cntr \cntr ldots+k_2-1] == v[ 0 \ldots k_2-1 ]. $$

}

To both of these query, you can answer for $O(1)$, using \bf{\algohref=z_function{an algorithm for finding the Z-function}}:

\ul{

\li To quickly find the values for $k_1$ in advance calculate a Z-function for the line $\overline{u}$ (i.e. the rows of $u$, written out in reverse order).

Then the value of $k_1$ for a specific $cntr$ will simply be equal to the corresponding array value Z-function.

\li To quickly find the values of $k_2$ in advance calculate a Z-function for the line $v+\#+u$ (i.e. rows of $u$, the string assigned to $v$ using the separator character).

Again, the value of $k_2$ for a specific $cntr$ it would simply be taken from the corresponding element of the Z-function.

}


\h4{ Search for the right tandem repeats }

Up to this point we have worked only with left tandem repeats.

To search for the right tandem repeats, it is necessary to act similarly: we define the center $cntr$ as a symbol, the symbol corresponding to the last tandem repeat, who are in the first row.

Then the length $k_1$ will be defined as the maximum number of characters up to position $cntr$ inclusive, coinciding with the last characters of the string $u$. Length $k_2$ would be defined as the maximum number of characters starting with $cntr+1$, which coincides with the first characters of the string $v$.

Thus, for quick finding $k_1$ and $k_2$ should be calculated in advance the Z-function for strings $\overline{u} + \# + \overline{v}$ and $v$ respectively. After that, touching the particular to the value of $cntr$, we are on the same criterion will find all the right tandem repeats.


\h4{ Asymptotics }

Asmptotic algorithm Meina-Lorentz will amount to thus $O (n \log n)$: since this algorithm represents the algorithm "divide-and-conquer", each recursive run which works in time linear to the length of the rows: four rows for linear time searched for them \algohref=z_function{Z-function}, and then moved to the value of $cntr$ and removed all groups detected tandem repeats.

Tandem repeats found by the algorithm Meina-Lorentz equations in the form of a kind \bf{group}: the number of such quadruples $(cntr, l, k_1, k_2)$, each of which refers to a group of tandem repeats with length $l$, the center $cntr$ and with all sorts of pieces of lengths $l_1$ and $l_2$, satisfying the conditions:

$$ \cases{
l_1 + l_2 = l, \cr
l_1 \le k_1, \cr
l_2 \le k_2.
} $$



\h2{ the Implementation }

Here is an implementation of the algorithm Meina-Lorentz, at which time $O (n \log n)$ finds all tandem repeats of a given row in a compressed form (as groups described by quadruples of numbers).

For demonstration purposes, the detected tandem repeats within time $O (n^2)$ "uncoil" and displayed separately. This conclusion when solving real-world problems will be easy to replace with some other, more effective actions, for example, on the search for the longest tandem repeat, or a count of the number of tandem repeats.

\code
vector<int> z_function (const string & s) {
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

output_tandem void (const string & s, int shift, bool left, int cntr, int l, int l1, int l2) {
int pos;
if (left)
pos = cntr-l1;
else
pos = cntr-l1-l2-l1+1;
cout << "[" << shift + pos << ".." << shift + pos+2*l-1 << "] = " << s.substr (pos, 2*l) << endl;
}

output_tandems void (const string & s, int shift, bool left, int cntr, int l, int k1, int k2) {
for (int l1=1; l1<=l; ++l1) {
if (left && l1 == l) break;
if (l1 <= k1 && l-l1 <= k2)
output_tandem (s, shift, left, cntr, l, l1, l-l1);
}
}

inline int get_z (const vector<int> & z, int i) {
return 0<=i && i<(int)z.size() ? z[i] : 0;
}

find_tandems void (string s, int shift = 0) {
int n = (int) s.length();
if (n == 1) return;

int nu = n/2, nv = n-nu;
string u = s.substr (0, nu),
v = s.substr (nu);
string EN = string (u.rbegin(), u.rend()),
rv = string (v.rbegin(), V. rend());

find_tandems (u, shift);
find_tandems (v, shift + nu);

vector<int> z1 = z_function (ru),
z2 = z_function (v + '#' + u),
z3 = z_function (EN + '#' + rv),
z4 = z_function (v);
for (int cntr=0; cntr<n; cntr++) {
int l, k1, k2;
if (cntr < nu) {
l = nu - cntr;
k1 = get_z (z1, nu-cntr);
k2 = get_z (z2, nv+1+cntr);
}
else {
l = cntr - nu + 1;
k1 = get_z (z3, nu+1 + nv-1-(cntr-nu));
k2 = get_z (z4, (cntr-nu)+1);
}
if (k1 + k2 >= l)
output_tandems (s, shift, cntr<nu, cntr, l, k1, k2);
}
}
\endcode


\h2{ Literature }

\ul{

\li \href=http://www.cs.colorado.edu/department/publications/reports/docs/CU-CS-241-82.pdf{Michael Main, Richard J. Lorentz. \bf{An O (n log n) Algorithm for Finding All Repetitions in a String} [1982]}

\li Bill Smyth. \bf{Computing Patterns in Strings} [2003]

\li bill Smith. \bf{Methods and algorithms of calculations on lines} [2006]

}
