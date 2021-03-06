
\h1{Sqrt-decomposition}

Sqrt-decomposition is a method or a data structure that allows you to perform some typical operation (summing the elements of the subarray, finding minimum/maximum, etc.) for $O(\sqrt{n})$, which is significantly faster than $O(n)$ for the trivial algorithm.

We first describe the data structure for one of the simplest applications of this idea, then show how to generalize it to solve some other problems, and, finally, consider a slightly different application of this idea: split the input queries into sqrt-blocks.


\h2{a data Structure based on the sqrt-decomposition}

\bf{Deliver task}. Given an array $a[0 \ldots n-1]$. You want to implement such a data structure that will be able to find the sum of elements $a[l \ldots r]$ for arbitrary $l$ and $r$ for $O(\sqrt{n})$ operations.


\h3{Description}

The main idea is sqrt-decomposition is that will do the following \bf{predpochel}: divide the array $a$ into blocks of length about $\sqrt{n}$, and for each block $i$ in advance let's calculate following values of $b[i]$ of elements in it.

We can assume that the length of one block and number of blocks equal to the same number --- root of $n$, rounded up:

$$ s = \left\lceil \sqrt{n} \right\rceil, $$

then the array $a[]$ is divided into blocks of approximately thus:

$$ \underbrace{ a[0] ~ a[1] ~ \ldots ~ a[s-1] }_{b[0]} ~~~ \underbrace{ a[s] ~ a[s+1] ~ \ldots ~ a[2 \cdot s-1] }_{b[1]} ~~~ \ldots ~~~ \underbrace{ a[(s-1) \cdot s] ~ \ldots ~ a[n] }_{b[s-1]}. $$

Although the last block may contain less than $s$, elements (if $n$ is not divisible by $s$), --- it does not matter.

Thus, for each block of $k$ we know the sum $b[k]$:

$$ b[k] = \sum_{i=k \cdot s}^{\min (n-1, (k+1) \cdot s - 1)} a[i]. $$

So, let these $b_k$ are pre-calculated (for this we need, obviously $O(n)$ operations). What they can give in the calculation of response for the next request $(l,r)$? Note that if the segment $[l;r]$ long, then it will contain some blocks as a whole, and in these blocks we can find out the balance on them in one operation. As a result, the whole segment $[l;r]$ will only have two blocks that enter into it only partially, and on those pieces we need to produce the summation of the trivial algorithm.

Illustration (here $k$ denoted by a block number, which is $l$, and using $p$ --- the block number, which is $r$):

$$ \ldots ~ \overbrace{ a[l] ~ \ldots ~ a[(k+1) \cdot s-1] ~ \underbrace{ a[(k+1) \cdot s] ~ \ldots ~ a[(k+2) \cdot s-1] }_{b[k+1]} ~ \ldots ~ \underbrace{ a[(p-1) \cdot s] ~ \ldots ~ a[p \cdot s-1] }_{b[p]}\ a[p \cdot s] ~ \ldots a_r }^{sum=?} ~ \ldots $$

In this figure it is seen that in order to calculate the sum in the interval $[l \ldots r]$, we need to sum the elements in only two "tails": $[l \ldots (k+1) \cdot s-1]$ and $[p \cdot s \ldots r]$, and sum the value of $b[i]$ in all blocks, starting with $k+1$ and ending with $p-1$:

$$ \sum_{i=l}^{r} a[i] = \sum_{i=l}^{(k+1) \cdot s-1} a[i] + \sum_{i=k+1}^{p-1} b[i] + \sum_{i=p \cdot s}^{r} a[i] $$

(note: this formula is wrong, when $k=p$: in this case, some elements will be totaled twice; in this case, we just need to sum the elements from $l$ by $r$)

Thus we ekonomim a significant number of transactions. Indeed, the size of each "tails", obviously, does not exceed the block length $s$, and also the number of blocks does not exceed $s$. Since $s$ we choose $\approx \sqrt{n}$, then for computing the sum on the interval $[l \ldots r]$, we need only $O(\sqrt{n})$ operations.


\h3{Implementation}

Let us give first the simplest implementation:

\code
// the input data
int n;
vector<int> a (n);

// redpocket
int len = (int) sqrt (n + .0) + 1; // and the block size, and the number of blocks
vector<int> b (len);
for (int i=0; i<n; ++i)
b[i / len] += a[i];

// response to queries
for (;;) {
int l, r; // read the input - a request
int sum = 0;
for (int i=l; i<=r; )
if (i % len == 0 && i + len - 1 <= r) {
// if i points to beginning of a block lying entirely in [l;r]
sum += b[i / len];
i += len;
}
else {
sum += a[i];
++i;
}
}
\endcode

The disadvantage of this implementation is that it a disproportionate amount of the division operations (which, as we know, are significantly slower than other operations). Instead, you can count the number of blocks $c_l$ and $c_r$, which are boundaries of $l$ and $r$ respectively, and then make the loop blocks with $c_l+1$ on $c_r-1$, separately processed the "tails" in blocks of $c_l$ and $c_r$. In addition, this case $c_l = c_r$ is a special and requires a separate treatment:

\code
int sum = 0;
int c_l = l / len, c_r = r / len;
if (c_l == c_r)
for (int i=l; i<=r; ++i)
sum += a[i];
else {
for (int i=l, end=(c_l+1)*len-1; i<=end; ++i)
sum += a[i];
for (int i=c_l+1; i<=c_r-1; ++i)
sum += b[i];
for (int i=c_r*len; i<=r; ++i)
sum += a[i];
}
\endcode


\h3{Other problems}

We considered the problem of finding the sum of array elements in a current segment. This can expand a bit: also allow \bf{change} individual elements of the array $A$. Indeed, if you change an element $a_i$, it is sufficient to update the value of $b[k]$ in the unit in which this item is ($k = i / len$):

$$ b[k] += a[i] - old\_a[i]. $$

On the other hand, is the problem of the amount similarly one can solve the problem of \bf{min, max} elements in the segment. If these tasks to allow changes of individual elements, we also need to recalculate the value of $b_k$ of the block which belongs to element to change, but to convert already fully, pass all the elements of the block for $O(len) = O(\sqrt{n})$ operations.

Similarly, sqrt-decomposition can be applied to many \bf{other} similar problems: finding the number of zero elements, the first non-null element counting the number of certain elements, etc.

There is a whole class of problems, when there \bf{edit the elements on the whole current segment}: the addition or the assignment of elements to a current segment of the array $A$.

For example, you need to perform the following two types of queries: add all elements of a segment $[l;r]$ the value $\delta$, and find the value of the single element $a_i$. Then as the $b_k$ put the value which needs to be added to all elements of $k$-th block (for example, initially, all $b_k = 0$); then when you run the query "addition" will need to perform the addition to all the elements $a_i$ of "tails", and then perform the addition to all the elements $b_i$ for blocks lying entirely in the interval $[l \ldots r]$. And the answer to the second query, obviously, will be just $a_i + b_k$, where $k = i / len$. Thus, the addition on the segment will be executed $O(\sqrt{n})$, and a request for a single element --- for $O(1)$.

Finally, you can combine both types of problems: change elements on the interval and answer the queries on the interval. Both operations will be executed $O(\sqrt{n})$. To do this, we must do two "block" of the array $b$ and $c$: one --- to ensure changes on the segment, the other --- to answer the requests.

There is an example and other tasks, which you can use sqrt-decomposition. For example, we can solve the problem of \bf{the maintenance of a set of numbers} with the ability to add/delete numbers, check numbers belonging to the set, finding the $k$-th order number. To solve this problem it is necessary to store numbers in sorted order, separated by a few blocks at $\sqrt{n}$ numbers each. When you add or delete the number it will be necessary to produce a "rebalancing" of the blocks, throwing the number of starts/ends of some blocks in the beginning/ends of the adjacent blocks.


\h2{Sqrt-decomposition of the input query}

Let us now consider a completely different application of the idea of sqrt-decomposition.

Suppose that we have some task in which we are given some input data, and then do $k$ commands/requests, each of which we must give to process and issue a response. We consider the case when queries are requesting (do not change system state, and only requesting some information), and modifying (i.e. affecting the state of the system, initially given input data).

A specific task can be quite complex, and "fair" solution (one which reads the request, processes it, changing the state of the system, and returns the response) may be technically difficult or even not be able to decisive. On the other hand, the solution "offline" version of the task, i.e. when there are no modifying operations, and are only requesting requests --- it is often much easier. Suppose we \bf{know how to solve the "offline" option} objectives, i.e. to build for some time $B(n)$ a data structure that can answer queries, but does not know how to handle the modifying requests.

Then \bf{we split the input queries into blocks} (how long --- until we specify; we denote this length using $s$). At the beginning of processing of each block will be $B(n)$ to construct the data structure for an "offline" version of the task state of the data at the start of this block.

Now we take turns to take requests from the current block and handle each of them. If the current request --- the modifier, then skip this one. If the current request --- requesting, please refer to the data structure for the offline version of the problem, but pre - \bf{taking into account all modifying requests in the current block}. Is considering modifying queries is not always possible, and it should happen fairly quickly --- within time $O(s)$ or a little worse; we denote this time using $Q(s)$.

Thus, if we have $m$ queries, it will take $B(m) \frac{m}{s} + m Q(s)$ time. The value of $s$ should be selected based on the specific function $B()$ and $Q()$. For example, if $B(m)=O(m)$ and $Q(s)=O(s)$, then the optimal choice is $s \approx \sqrt{m}$, and the complexity will get $O (m \sqrt{m})$.

Since the above reasoning is too abstract, here are a few examples of tasks to which we can apply this sqrt-decomposition.


\h3{task Example: adding on a segment}

Problem statement: given an array of numbers $a[1 \ldots n]$, and do queries of two types: find the value of the $i$-th element of the array, and add some number $x$ to all elements of the array in some interval $a[l \dots r]$.

Although this problem can be solved without this technique to split requests into blocks, we will bring her here --- as the simplest and obvious application of this method.

So, we split the input queries into blocks of $\sqrt{m}$ (where $m$ --- the number of requests). At the beginning of the first block of requests to build any structures don't, just stored the array $a[]$. Go now queries the first block. If the current request --- request the addition, we still miss it. If the current request is a read request, the values in some position $i$, first just take in response to the value of $a[i]$. Then go through all missed in this block requests the addition, and for those of them, which gets $i$, applies their increase to the current response.

Thus, we have learned to respond to the requesting requests for time $O(\sqrt{m})$.

It remains only to notice that at the end of each block of requests, we must apply all modifier queries of this block to an array $a[]$. But this is easily done in $O(n)$ --- enough for each request the addition of $(l,r,x)$ to point in the auxiliary array at the point $l$, the number $x$ and a point $r+1$ --- number $-x$, and then work through that array, adding the current sum to the array $a[]$.

Thus, the overall complexity will be $O (\sqrt{m} (n + m))$.


\h3{task Example: disjoint-set-union split}

There is an undirected graph with $n$ vertices and $m$ edges. Requests are coming in three types: add an edge $(x_i,y_i)$, delete the edge $(x_i,y_i)$, and check, connected or no vertices $x_i$ and $y_i$ by.

If requests deletion was absent, then the decision problem would be known to the data structure \algohref=dsu{disjoint-set-union (DSU)}. However, in the presence of erasures, the task is much more complicated.

Will do as follows. At the beginning of each block query let's see what the edges in this block will be removed immediately \bf{remove} them from the graph. Now let us build the DSU (dsu) on the resulting graph.

As we now have to answer another query from the current block? Our DSU "knows" about all the ribs, except those that are added/removed in the current block. However, removal of the dsu, we do no longer need --- we have removed all such edges from the graph. Thus, all that can be --- it's an extra added edges, which can be a maximum of $\sqrt{m}$ units.

Therefore, in response to requesting the current request we can just let a breadth-first components connectivity dsu that will work for $O(\sqrt{m})$, because in our consideration will be only $O(\sqrt{m})$ edges.



\h2{Offline tasks on requests for programming a universal array and sqrt-heuristics for them}

Let's look at another interesting variation of the idea of sqrt-decomposition.

Suppose we have some goal in which there is an array of numbers, and come requesting the queries having the form $(l,r)$ --- to learn something about the current segment $a[l \ldots r]$. We believe that requests are not modifying, and known in advance, i.e. task --- off-line.

Finally, we introduce recent \bf{restriction}: we can fast recalculate the answer to the query when you change left or right margin by one. I.e. if we knew the answer to the query $(l,r)$, we can quickly calculate the answer to the query $(l+1,r)$ or $(l-1,r)$ or $(l,r+1)$ or $(l,r-1)$.

Let us describe now \bf{generic heuristics} for all such tasks. Sort the queries by a pair $(l ~ {\rm div} ~ \sqrt{n}, r)$. I.e., we sorted the queries by number sqrt block, which is the left end, and by equality --- at the right end.

Let us now consider queries with the same value $l ~ {\rm div} ~ \sqrt{n}$ and will process all requests of this group. The answer to the first request count in a trivial way. Each following request will be considered on the basis of the previous answer ie moving left and right borders of the previous query to the borders of the next request while maintaining the current response. Rate asymptotics: the left border each time could move at no more than $\sqrt{n}$ times, and the right --- not exceeding $n$ times in the sum over all queries in the current group. Total if the current group was composed of $k$ queries, the sum will be made no more than $n + k \cdot \sqrt{n}$ scaling. In sum, throughout the algorithm will succeed --- $O((n + m) \cdot \sqrt{n})$ recalculations.

Simple \bf{example} this heuristic is such task: to find out the number of different numbers in the array segment $[l;r]$.

A slightly more complicated variant of this problem is \href=http://www.codeforces.EN/contest/86/problem/D{problem with one of the Codeforces rounds}.
