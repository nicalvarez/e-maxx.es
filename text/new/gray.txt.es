\h1{ gray Code }


\h2{ Definition }

With gray code the system is called numerowana of non-negative numbers, when codes of two adjacent integers differ in exactly one bit position.

For example, for numbers of length 3 bits have the following sequence of gray codes: $000$, $001$, $011$, $010$, $110$, $111$, $101$, $100$. For Example, $G(4)=6$.

This code was invented by Frank gray (Frank Gray) in 1953.


\h2{ finding a gray code }

Consider the bits of the number $n$ bits and $G(n)$. Note that $i$-th bit $G(n)$ is equal to one only in the case when $i$-th bit $n$ is unity, and $i+1$-th bit is equal to zero, or Vice versa (the$i$-th bit is equal to zero, and $i+1$-th equal to one). Thus, we have: $G(n) = n \oplus (n>>1)$:

\code
int g (int n) {
return n ^ (n >> 1);
}
\endcode


\h2{ Finding the inverse gray code }

Required by gray code $g$ to restore the original number $n$.

We will go from senior to Junior bits (the least significant bit has the number 1 and the most senior --- $k$). Get the ratio between bits $n_i$ the number $n$ bits and $g_i$ of $g$:

$$ n_k = g_k, $$
$$ n_{k-1} = g_{k-1} \oplus n_k = g_k \oplus g_{k-1}, $$
$$ n_{k-2} = g_{k-2} \oplus n_{k-1} = g_k \oplus g_{k-1} \oplus g_{k-2}, $$
$$ n_{k-3} = g_{k-3} \oplus n_{k-2} = g_k \oplus g_{k-1} \oplus g_{k-2} \oplus g_{k-3}, $$
$$ \ldots $$

In the form of a program code is most easily written as:

\code
rev_g int (int g) {
int n = 0;
for (; g; g>>=1)
n ^= g;
return n;
}
\endcode


\h2{ Application }

Gray codes have several applications in various areas, sometimes quite unexpected:

\ul{

\li $n$-bit gray code corresponds to a Hamiltonian cycle on an $n$-dimensional cube.

\li In the art, gray code is used to \bf{minimize errors} when converting analog signals to digital (e.g., sensors). In particular, gray codes and were discovered in connection with this application.

\li the gray code used in the solution of the problem of \bf{towers of Hanoi}.

Let $n$ be the number of disks. Let's start with the gray code of length $n$ consisting of only zeros (i.e. $G(0)$), and we'll move on codes gray ($G(i)$ pass to $G(i+1)$). We will give a short each $i$-th bit of the gray code of the current $i$-th disc (and the youngest bit corresponds to the smallest disk, and the highest-order bit --- the greatest). Because at each step exactly one bit is changed, we can understand the change of bit $i$ as the displacement of the $i$-th disc. Note that for all drives, except the smallest, at each step there is exactly one kind of move (except for the starting and final positions). For the smallest disk there are always two kinds of moves, however, there is the strategy of choice of move always leads to the answer: if $n$ is odd, then the sequence of moves of the smallest disk has the form $f \rightarrow t \rightarrow r \rightarrow f \rightarrow t \rightarrow r \rightarrow \ldots$ (where $f$ --- starter rod, $t$ --- final rod, $r$ --- the rest of the rod), and if $n$ is even, then $f \rightarrow r \rightarrow t \rightarrow f \rightarrow r \rightarrow t \rightarrow \ldots$.

\li gray Codes are also used in the theory of \bf{genetic algorithms}.

}


\h2{ Problem in online judges }

The list of tasks that can be taken, using the gray code:

\ul{

\li \href=http://acm.sgu.ru/problem.php?contest=0&problem=249{SGU #249 \bf{"Matrix"} ~~~~ [difficulty: medium]}

}
