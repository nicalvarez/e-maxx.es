
\h1{ Suffix automaton }

\bf{Suffix automaton} (or \bf{a directed acyclic graph of words}) --- is a powerful data structure that allows to solve many string problems.

For example, using a suffix automaton to search for all occurrences of one string within another, or count the number of different substrings of the given string --- both tasks it allows to solve in linear time.

At an intuitive level, suffix automaton can be understood as concise information about \bf{all substrings} of the given string. An impressive fact is that the suffix automaton contains all the information in a compressed form so that the strings of length $n$ it requires only $O(n)$ memory. Moreover, it can be also built within time $O(n)$ (if we consider the size of the alphabet of $k$ constant; otherwise --- at the time $O (n \log k)$).

\bf{Historically}, the first linear size of suffix automaton was opened in 1983 Blumer and others, and in 1985 --- 1986 he presented the first algorithms for its construction in linear time (Crochemore, Blumer, etc.). Read more --- see literature at the end of the article.

In English suffix automaton is called a "suffix automaton" (plural --- "suffix automata"), and a directed acyclic graph of words --- "directed acyclic word graph" (or "DAWG").


\h2{ the definition of the suffix automaton }

Definition. \bf{Suffix automaton} for the given string $s$ is called a minimal deterministic finite automaton that accepts all suffixes of the string $s$.

Decode this definition.

\ul{

\li Suffix automaton is a directed acyclic graph where vertices are called \bf{States}, and the arc of the graph is the \bf{transitions} between these States.

\li One of the conditions $t_0$ is called a \bf{initial state}, and it should be the source of the graph (i.e. reachable from all other States).

\li Each \bf{transition} in the machine --- this is an arc, labeled by some symbol. All the transitions emanating from any state must be \bf{different} marks. (On the other hand, the state may have no transition on any character.)

\li One or more States marked as \bf{terminal state}. If we pass from the initial condition $t_0$ along any path to any terminal States, and let us write in this case labels of all traversed arcs, you get a string that must be one of the suffixes of the string $s$.

\li Suffix automaton with a minimal number of vertices among all machines that satisfy the conditions described above. (Minimality of the number of conversions is not required, because under the condition of minimality of the number of States in the machine may not be "extra" ways --- otherwise it would break the previous property.)

}


\h3{ Elementary properties of the suffix automaton }

The simplest, and yet the most important property of suffix automaton is that it contains information about all the substrings of $s$. Namely, \bf{any path} from the initial condition $t_0$, if we write out the labels of the arcs along this path, necessarily forms \bf{string} the string $s$. Conversely, any substring of the string $s$ corresponds to the path starting at the initial condition $t_0$.

In order to simplify the explanation, we will say that a substring \bf{corresponds to} the path from the initial state, form labels along which the substring. Conversely, we will say that any path \bf{matches} is the string formed by the labels of its arcs.

In every state of the suffix automaton leads one or more paths from the initial state. Let's say that the state \bf{meets} the set of lines corresponding to all these paths.


\h3{ Examples built suffix automata }

Give examples of suffix automata built for several simple lines.

The initial state we will denote here using $t0$ and the terminal condition --- to star.

For a string $s = ""$:

\img{suffix_automaton_sample_1.gif}

For a string $s = "a"$:

\img{suffix_automaton_sample_2.gif}

For a string $s = "aa"$:

\img{suffix_automaton_sample_3.gif}

For a string $s = "ab"$:

\img{suffix_automaton_sample_4.gif}

For a string $s = "aba"$:

\img{suffix_automaton_sample_5.gif}

For a string $s = "abb"$:

\img{suffix_automaton_sample_6.gif}

For a string $s = "abbb"$:

\img{suffix_automaton_sample_7.gif}



\h2{ an Algorithm for constructing the suffix automaton in linear time }

Before you go directly to the description of the algorithm, we must introduce several new concepts and prove a simple, but very important to understand suffix automaton of the Lemma.


\h3{ Position endings $endpos$, their properties and connection with suffix automaton }

Consider any non-empty substring $t$ of a string $s$. Then we call \bf{multiple endings} $endpos(t)$ the set of all positions in the string $s$, which is over occurrences of the string $t$.

We will call two substrings $t_1$ and $t_2$ of $seconds$-equivalent if their sets of endings are identical: $endpos(t_1) = endpos(t_2)$. Thus, all non-empty substrings of $s$ can be divided into several \bf{equivalence classes} according to their sets, $endpos$.

It appears that the suffix in the machine \bf{$endpos$-equivalent to the substrings corresponds to the same condition}. In other words, the number of States in the automaton the suffix is equal to the number of classes $endpos$-equivalence among all substrings, plus one initial state. Each state of the suffix automaton correspond to one or more substrings, having the same value of $seconds$.

\bf{This statement we accept as axiom}, and describe an algorithm for constructing the suffix automaton on the basis of this assumption --- then as we shall see, all of the required properties of suffix automaton, except for the minimality, will be performed. (And the minimality follows from Nerode theorem --- see the bibliography.)

Here are also several simple but important statements about the values $endpos$.

\bf{Lemma 1}. Two non-empty substring $u$ and $w$ ($length(u) \le length(w)$) are $endpos$-equivalent if and only if the string $u$ occurs in row $s$ only in the form of a suffix of the string $w$.

The proof is almost obvious. One way: if $u$ and $w$ have the same position of occurrence of the endings, then $u$ is a suffix of $w$, and it is present in $s$ only in the form of a suffix of $w$. In the opposite direction: if $u$ is a suffix of $w$ and is only as this suffix, $endpos$ are equal by definition.

\bf{Lemma 2}. Consider two non-empty substring $u$ and $w$ ($length(u) \le length(w)$). Then set $endpos$ either do not intersect or $endpos(w)$ entirely contained in $endpos(u)$, and this depends on whether $u$ is a suffix of $w$ or not:

$$ \begin{cases}
endpos(w) \subset endpos(u) & \text{if $u$ --- suffix of $w$,}
\\
endpos(u) \cap endpos(w) = \emptyset & \text{otherwise.}
\end{cases} $$

Proof. Suppose that the set $endpos(u)$ and $endpos(w)$ have at least one common element. Then it means that the rows of $u$ and $w$ ends in the same place, i.e. $u$ --- the suffix of $w$. But then every occurrence of the string $w$ contains at its end an occurrence of the string $u$, that means that it many $endpos(w)$ is invested entirely in the set $endpos(u)$.

\bf{Lemma 3}. Consider the class $endpos$-equivalence. Sort all substring included in this class, in increasing order of length. Then, in the resulting sequence, each substring will be one shorter than the previous one, and thus to be a suffix of the previous one. In other words, \bf{substring belonging in the same equivalence class, are in fact the suffixes of each other, and take all sorts of different lengths in some interval $[x;y]$}.

Proof.

Fix some class $endpos$-equivalence. If it contains only one line, the correctness of the Lemma is obvious. Now let the number of rows is greater than one.

According to Lemma 1, two different $endpos$-equivalent strings are always such that one is a proper suffix of another. Thus, in one class $endpos$-equivalence cannot be strings of the same length.

Denote by $w$ the longest, and using $u$ --- the shortest string in the equivalence class. According to Lemma 1, the line $u$ is a proper suffix of a string $w$. Consider now any suffix of a string $w$ with length in the interval $[length(u); length(w)]$, and show that it is contained in the same equivalence class. In fact, this suffix can enter the $s$ in a suffix of the string $w$ (since a shorter suffix $u$ is only in the form of a suffix of the string $w$). Hence, according to Lemma 1, this suffix $endpos$-equivalent to the string $w$, what we wanted to prove.


\h3{ Suffix links }

Consider some state of the automaton $v \ne t_0$. As we now know, the condition $v$ corresponds to some class of strings with identical values $endpos$, and if we denote by $w$ the longest of these lines, all the other will be a suffix of $w$.

We also know that the first few suffixes of the string $w$ (if we consider the suffixes in descending order of their length) are contained in the same equivalence class, and all other suffixes (at least, the empty suffix) --- in some other classes. Denote by $t$ the first suffix like this --- we will hold a suffix link.

In other words, \bf{suffix link} $link(v)$ leads to such a state, which corresponds to \bf{longest suffix} the string $w$ that is in a different class, $endpos$-equivalence.

Here we consider the initial condition $t_0$ corresponds to a separate equivalence class (containing only the empty string), and believe $endpos(t_0) = [-1 \ldots length(s)-1]$.

\bf{Lemma 4}. The suffix links form \bf{tree}, whose root is the initial condition $t_0$.

Proof. Consider an arbitrary state $v \ne t_0$. Suffix link $link(v)$ leads from it into a state, which correspond to the strings of strictly smaller length (this follows from the definition of suffix links and from Lemma 3). Therefore, moving along the suffix links, we sooner or later will come from the state of $v$ in the initial condition $t_0$, which corresponds to an empty string.

\bf{Lemma 5}. If we build from all the available sets $seconds to$ \bf{tree} ("set-parent contains as subsets all my children"), it will be identical in structure to the tree of suffix links.

Proof.

What of the sets $endpos$ you can build a tree, follows from Lemma 2 (stating that any two sets $endpos$ either disjoint or one is contained in another).

Let us now consider an arbitrary state $v \ne t_0$ and its suffix link $link(v)$. From the definition of suffix links and from Lemma 2 it follows:

$$ endpos(v) \subset endpos(link(v)), $$

that, coupled with the previous Lemma and proves our claim: the tree of suffix links is essentially a tree nesting set $seconds$.

\bf{example} the tree of suffix links in suffix automaton constructed for the string $"abcbc"$:

\img{suffix_automaton_link.gif}


\h3{ Subtotal }

Before proceeding to the algorithm, systematize the accumulated knowledge above, and we introduce a few auxiliary denitions.

\ul{

\li the Set of substrings of the string $s$ can be divided into equivalence classes according to their sets end $endpos$.

\li Suffix automaton consists of an initial condition $t_0$, and one state for each class $endpos$-equivalence.

\li to Each state of $v$ corresponds to one or more rows. Denote by $longest(v)$ of the longest of these rows using $len(v)$ its length. Denote by $shortest(v)$ of the shortest such string and its length using $minlen(v)$.

Then all the rows that match this condition, are different suffixes of the string $longest(v)$ and have all sorts of length in the interval $[minlen(v); len(v)]$.

\li For each $v \ne t_0$ is defined a suffix link leading to such a state that matches the suffix string $longest(v)$ of length $minlen(v)-1$. Suffix links form a tree rooted at $t_0$, and this tree actually is a tree inclusion relations between the sets $endpos$.

\li Thus, $minlen(v)$ for $v \ne t_0$ is expressed by using suffix links $link(v)$ as:

$$ minlen(v) = len(link(v)) + 1. $$

\li If we start from an arbitrary state $v_0$ and we will follow the suffix links, we sooner or later reach the initial condition $t_0$. Thus we get a sequence of disjoint intervals $[minlen(v_i); len(v_i)]$, which in combination will give one continuous cut.

}


\h3{ an Algorithm for constructing the suffix automaton in linear time }

Proceed to describe the algorithm. The algorithm will be \bf{online}, i.e. it will add one character of a string $s$ by rearranging accordingly the current machine.

To achieve linear memory consumption, in each state we will only store the value of $len$, $link$, and a list of transitions from this state. Labels of terminal States, we are not going to support (we'll show you how to place these labels after building the suffix automaton, if there is a need for them).

\bf{Initially} machine consists of a single state $t_0$, which we shall assume a zero state (all other States will get the numbers $1, 2, \ldots$). Assign this as $len = 0$ and the value $link$, we set for convenience $-1$ (meaning the reference to fictitious, non-existent state).

Accordingly, the whole task now is to implement the processing \bf{added} $c$ to the end of the current line. Let's describe this process:

\ul{

\li Let $last$ is the state corresponding to the entire current line to add a symbol $c$. (Originally $last = 0$, and after adding each symbol, we will change the value of $last$.)

\li Create a new state $cur$, putting him $len(cur) = len(last) + 1$. The value of $link(cur)$ are considered to be uncertain.

\li Make this loop: initially we are in state $last$; if no go to the letter $c$, then we add the transition by the letter $c$ in the state $cur$, and then go through suffix link, checking again --- if no transition, add. If at some point that this transition is already there, then stop --- and denote by $p$ the number of the state where it happened.

\li If never happened, that the letter $c$ is already there, and we came to a fictitious state of $-1$ (which we got by the suffix link from the initial condition $t_0$) then we can just assign to $link(cur) = 0$ and exit.

\li Suppose now that we had stopped at a state $p$, from which it was the transition by the letter $c$. Denote by $q$ the state, where does this existing junction.

\li we Now have two cases depending on whether, $len(p) + 1 = len(q)$ or not.

\li If $len(p) + 1 = len(q)$, then we can just assign to $link(cur) = q$ and exit.

\li otherwise, everything is more complicated. It is necessary to make \bf {purpose} the condition $q$: to create a new condition $clone$ by copying all the data from the vertex $q$ (suffix link, transitions), except for the value of $len$: need to set $len(clone) = len(p) + 1$.

After cloning, we conduct a suffix link from $cur$ is in state $clone$ also forwarded a suffix link from $q$ in $clone$.

Finally, the last thing we should do is to go from state $p$ in suffix links, and for each next condition to check: if there was a transition by the letter $c$ in state $q$, then redirect it to the state $clone$ (and if not, then stop).

\li In any case, whatever the outcome of this procedure, we update the value of $last$, giving him $cur$.

}

If we also need to know which vertices are the \bf{terminal}, and what --- no, we can find all terminal vertices after building the suffix automaton for the entire row. For this we consider the state of the entire string (it is, obviously we stored in the variable $last$), and we will follow its suffix links until we reach the initial state, and mark each completed as a terminal condition. It is easy to understand that by doing so we are going to label the States corresponding to all suffixes of the string $s$ that we need.

In the next section we will discuss each step of the algorithm and show it \bf{correctness}.

Here only we will note that from the algorithm it is seen that adding one symbol leads to the addition of one or two States in the machine. Thus, \bf{the linearity of the number of States} is obvious.

Linearity in the number of transitions, and indeed the linear time algorithm less intuitive, and they will be proved below, after the proof of correctness of the algorithm.


\h3{ Proof of correctness of algorithm }

\ul{

\li Call the transition $(p,q)$ \bf{continuous} if $len(p) + 1 = len(q)$. In the opposite case, i.e. when $len(p) + 1 < len(q)$, the transition will call \bf{not continuous}.

As can be seen from the description of the algorithm, a continuous and non-continuous transitions lead to different branches of the algorithm. Continuous transitions are so called because, having appeared for the first time, they never will change. In contrast, non-continuous transitions may change when adding new letters to the line (may change the end of the arc-transition).

\li avoid ambiguities, under the string $s$ we define the line for which was built the suffix automaton to add the current character $c$.

\li the Algorithm starts with the fact that we create a new state $cur$, which will match the entire string $s + c$. It is clear why we must build up new state --- because together with the addition of a new symbol, a new equivalence class is the class of strings ending in added symbol $c$.

\li After the creation of the new state, the algorithm traverses the suffix links, starting from a state corresponding to the entire string $s$, and trying to add a transition for the symbol $c$ in the state $cur$. Thus, we assign to each suffix of the string $s$, the symbol $c$. But to add new transitions, we can only be the case if they do not conflict with already existing, so as soon as we meet any existing transition for the symbol $c$, we immediately have to stop.

\li The simplest case --- if we reach a dummy state to $-1$ by adding on the new everywhere along the transition of the symbol $c$. This means that the symbol $c$ in row $s$ not previously met. We have successfully added all the transitions, it remains only to add a suffix link from state $cur$ --- she obviously must be equal to $0$ because as $cur$ in this case correspond to all the suffixes of the string $s+c$.

\li the Second case --- when we got to the transition $(p,q)$. This means that we tried to add the machine to the line $x+c$ (where $x$ --- some suffix of the string $s$ with length $len(p)$), and this string \bf{has already been added} to the machine (i.e. the line $x+c$ is already included as a substring in the string $s$). Since we assume that the automaton for the string $s$ is built correctly, then the new transitions we need to add.

However, a complication arises, however, where the lead suffix link of state $cur$. We need to spend a suffix link in such a state, in which the longest line would be that $x+c$, i.e. $len$ for this state must be equal to $len(p) + 1$. However, such a condition could not exist: in this case we need to make \bf{"cleavage"} state.

\li so, one possible scenario is that the transition $(p,q)$ was continuous, i.e. $len(q) = len(p) + 1$. In this case, everything is simple, no splitting is not necessary to make, and we are just a suffix link from the state $cur$ in the state $q$.

\li Another, more complicated option --- when the transition of non-continuous, i.e. $len(q) > len(p) + 1$. This means that as $q$ corresponds to not only the desired substring $w+c$ of length $len(p) + 1$, but also substrings of greater length. We have no choice but to make \bf{"cleavage"} state $q$: smash cut lines corresponding to her two podotrack, so that the first will end with a length of $len(p) + 1$.

How to produce this splitting? We \bf{"clone"} state $q$, making a copy $clone$ with parameter $len(clone) = len(p) + 1$. We copy $clone$ from $q$ all transitions, since we do not want in any way to change the path passing through $q$. A suffix link from the $clone$ we go where they led the old suffix link from $q$, and the link of the $q$ guided $clone$.

After cloning, we conduct a suffix link from $cur$ a $clone$ --- something for which we have made cloning.

The last step is to redirect some incoming $q$ transitions, redirecting their $clone$. What kind of incoming transitions should be redirected? It helps to redirect only the transitions corresponding to all suffixes of the string $w+c$, i.e., we need to continue down the suffix links, starting with vertex $p$, and until, until we reach a dummy state of $-1$, or get to a state from which a transition leads to a condition $q$.

}


\h3{ Proof linear in the number of operations }

First, it's important that we consider the size of the alphabet \bf{constant}. If not, then talk about linear time will not work: the list of transitions from one vertex should be stored in the form of a balanced tree that allows you to quickly perform searches by key and add the key. Therefore, if we denote by $k$ the alphabet size, then the asymptotic behavior of the algorithm will be $O (n \log k)$ with $O (n)$ memory. However, if the alphabet is small enough, we can sacrifice the memory, to avoid balanced lists, and to store the transitions at each vertex as an array of length $k$ (for quick lookup by key) and a dynamic list (to quickly bypass all of the available keys). Thus we reach $O(n)$ time algorithm, but at the cost of $O (n k)$ memory consumption.

So, we assume the alphabet size is constant, i.e. each operation of searching for a transition for the symbol, add a transition, the search for next hop --- all these operations we consider working for $O(1)$.

If we consider all the parts of the algorithm, it contains three places of the linear asymptotic behavior which are not obvious:

\ul{

\li the First place --- a passage in suffix links from state $last$ by adding edges to $c$.

\li Second place --- up transitions when cloning a state $q$ in new condition $clone$.

\li Third place --- the redirection of transitions, leading to $q$, $clone$.

}

Use a well-known fact that the size of the suffix automaton (number of States and number of transitions) \bf{linear}. (The proof of linearity on the number of States is the algorithm and the proof of linearity on the number of transitions we present below, after the implementation of the algorithm.).

Then the total apparent linear asymptotics of \bf{first and second places} because each operation here adds to the machine, one new transition.

It remains to estimate the asymptotic total \bf{third place} --- where we redirect the transitions leading to $q$, $clone$. Let us denote $v = longest(p)$. This is the suffix of a string $s$, and with each iteration the length decreases and, hence, the position of $v$ as a suffix of a string $s$ is monotonically increasing with each iteration. In this case, if before the first loop iteration the corresponding row of $v$ was at a depth $k$ ($k \ge 2$) from $last$ (if we assume the depth is the number of suffix links, which should pass), then after the last iteration of the line $v+c$ becomes $2$-th suffix link on the path from $cur$ (which will become the new value of $last$).

Thus, each iteration of this loop leads to the fact that the position of the string $longest(link(link(last))$ as a suffix of the entire current row will monotonically increase. Therefore, this cycle could not work out more than $n$ iterations, \bf{what I say}.

(It is worth noting that similar arguments can be used to prove the linearity of the first-place, instead of referring to the proof of linearity of the number of States.)


\h2{ Implement algorithm }

First, we describe the data structure that will store all the information about the specific transition ($len$, $link$, the jump list). If necessary here you can add the flag of terminalnode, as well as other information requested. A jump list is stored in a standard container $map$ that allows to reach a total of $O(n)$ memory and $O (n \log k)$ time for processing the entire row.

\code
struct state {
int len, link;
map<char,int> next;
};
\endcode

Suffix automaton itself will be stored as an array of these structures $state$. As proved in the next section, if $MAXN$ --- it is possible to program the length of the string, it is sufficient to have the memory at $2 \cdot MAXN - 1$ States. We also stored a variable $last$ --- state, corresponding to the entire string at the moment.

\code
const int MAXLEN = 100000;
state st[MAXLEN*2];
int sz, last;
\endcode

Here is a function that initializes the suffix a machine (creating machine with a single initial state):

\code
void sa_init() {
sz = last = 0;
st[0].len = 0;
st[0].link = -1;
sz++;
/*
// this code is needed only if the machine is built many times for different rows:
for (int i=0; i<MAXLEN*2; ++i)
st[i].next.clear();
*/
}
\endcode

Finally, we present the implementation of the main functions --- which adds another symbol to the end of the current line, reconstructing suitably the machine:

\code
void sa_extend (char c) {
int cur = sz++;
st[cur].len = st[last].len + 1;
int p;
for (p=last; p!=-1 && !st[p].next.count(c); p=st[p].link)
st[p].next[c] = cur;
if (p == -1)
st[cur].link = 0;
else {
int q = st[p].next[c];
if (st[p].len + 1 == st[q].len)
st[cur].link = q;
else {
int clone = sz++;
st[clone].len = st[p].len + 1;
st[clone].next = st[q].next;
st[clone].link = st[q].link;
for (; p!=-1 && st[p].next[c]==q; p=st[p].link)
st[p].next[c] = clone;
st[q].link = st[cur].link = clone;
}
}
last = cur;
}
\endcode

As mentioned above, if you sacrifice some memory (to $O (n k)$, where $k$ is the alphabet size), we can achieve the build time of the machine is $O (n)$ for any even $k$ --- but you have each able to store an array of size $k$ (for a quick search of the transition according to the letter) and a list of all transitions (for a quick workaround or copy all transitions).



\h2{ Additional properties of suffix automaton }


\h3{ Number of States }

The number of States in suffix automaton constructed for the string $s$ of length $n$, \bf{not exceeding $2n-1$} ($n \ge 3$).

Proof of this is the algorithm described above (because initially the machine consists of one initial state, the first and second steps adds exactly one state and each of the remaining $n-2$ steps could be added by two peaks due to the splitting condition).

However, this estimate \bf{it is easy to show and without knowledge of the algorithm}. Recall that the number of States is the number of distinct sets $endpos$. In addition, these sets $endpos$ form a tree according to the principle of "top-parent contains as subsets all children." Consider this tree, and transform it a bit: as long as it has an internal vertex with one son, then it means that $endpos$ this son does not contain at least one number from $endpos$ parent; will then create a virtual vertex $endpos$, is equal to this number, and will gain the son to the parent. In the end, we get a tree in which each internal node has degree greater than one, and the number of leaves does not exceed $n$. Consequently, only in such a tree no more than $2n-1$ vertices.

So, we have shown that assessment independently, without knowledge of the algorithm.

It is interesting to note that this assessment neulussheim, i.e. there is \bf{test, where she achieved}. This test looks like this:

$$ "abbbb \ldots" $$

In the processing line at each iteration, starting from the third, there will be a splitting of the state, and, thus, would be achieved assessment of $2n-1$.


\h3{ Number of hops }

The number of transitions in suffix automaton constructed for the string $s$ of length $n$, \bf{does not exceed $3n-4$} ($n \ge 3$).

\bf{Prove} it.

Estimate the number of continuous transitions. Consider a spanning tree of longest paths in the automaton starting in state $t_0$. This frame will only consist of solid edges, and, therefore, their number is one less than the number of States, i.e. not greater than $2n-2$.

Now let us estimate the number of non-continuous transitions. Consider each non-continuous jump; let the current transition is a transition $(p,q)$ by the symbol $c$. Will put him in line the line $u+c+w$ where the line $u$ corresponds to the longest path from the initial state in $p$, and $w$ --- the longest path from $q$ to any terminal condition. On the one hand, all these lines of $u+c+w$ for all non-continuous passages are different (as strings $u$ and $w$ formed by only continuous transitions). On the other hand, each of these rows of $u+c+w$, by the definition of terminal States will be the suffix of the entire string $s$. Since non-empty suffixes of the string $s$ of all $n$ pieces, and the entire string $s$ among these lines $u+c+w$ could not be contained (because the entire string $s$ corresponds to the path from $n$ solid edges), the total number of non-continuous transitions does not exceed $n-1$.

Adding up these two estimates, we get the bound of $3n-3$. However, remembering that the maximum number of States can only be achieved on the test of the form $"abbbb \ldots "$, and estimate $3n-3$ is clearly not achieved, resulting a final score of $3n-4$, what we wanted to prove.

It is interesting to note that there are also \bf{test, on which this evaluation is achieved}:

$$ "abbb \ldots bbbc" $$


\h3{ Relation to suffix tree. Building a suffix tree by suffix automaton and Vice versa }

We will prove two theorems that establish the reciprocal relationship between suffix automaton and \algohref=ukkonen{suffix tree}.

Outset that we believe that the input string is such that each suffix has its own vertex in the suffix tree (as for random strings this is not true in General: for example, for the string $"aaa \ldots"$). Usually this is achieved by assigning to end of line special character (usually denoted by a dollar sign).

For convenience we introduce the notation: $\overline{s}$ is the line $s$, written in reverse order, $DAWG(s)$ is a suffix automaton constructed for the string $s$, $ST(s)$ is the \algohref=ukkonen{suffix tree} of a string $s$.

We introduce the notion of \bf{extend links}: fix the top of the suffix tree of $v$ and a symbol $c$; then extend link $ext[c,v]$ leads to the node tree that matches the string $c+v$ (if the path $c+v$ ends up in the middle of the rib, it will hold the link in the bottom end of this edge); if no such path $c+v$ is not in the tree, expand the undefined reference. In a sense, extends the links opposite the suffix links.

\bf{Theorem 1}. The tree formed by the suffix links in $DAWG(s)$ is a suffix tree $ST(\overline{s})$.

\bf{Theorem 2}. $DAWG(s)$ is the count of links extends the suffix tree $ST(\overline{s})$. In addition, the solid edges in $DAWG(s)$ is inverse suffix links in $ST(\overline{s})$.

These two theorems allow one of the structures (suffix tree or suffix to the machine) to build the other over time $O(n)$ --- these two simple algorithm will be discussed below in theorems 3 and 4.

For illustrative purposes, we present suffix automaton with its tree of suffix links and the corresponding suffix tree for inverted rows. For example, take a string $s = "abcbc"$.

$DAWG("abcbc")$ and the tree of suffix links (for clarity, we sign every condition of his $longest$string):

\img{suffix_automaton_st_1.gif}

$ST("cbcba")$:

\img{suffix_automaton_st_2.gif}

\bf{Lemma}. The following three statements are equivalent for any two substrings of $u$ and $w$:

\ul{

\li $endpos(u) = endpos(w)$ in the string $s$
\li $firstpos(\overline{u}) = firstpos(\overline{w})$ in the line $\overline{s}$
\li $\overline{u}$ and $\overline{w}$ lie on the same path from the root to the suffix tree, $ST(\overline{s})$.

}

The proof is pretty obvious: if the start of the occurrences of the two strings match, then one string is a prefix of another, and, therefore, one line is in the suffix tree in the way of another row.

\bf{the Proof of theorem 1}. 

The state of the suffix automaton correspond to the vertices of the suffix tree.

Consider an arbitrary suffix link $y = link(x)$. According to the definition of suffix links, $longest(y)$ is a suffix of $longest(x)$, and among all such $y$ is chosen the one with the $len(y)$ is maximal.

In terms of the inverse of the line $\overline{s}$, this means that the suffix link for $link[x]$ such leads into the longest prefix of the string corresponding to the state of $x$ to prefix this with a separate state of $y$. In other words, the suffix link for $link[x]$ leads to the parent of vertex $x$ in the suffix tree that we wanted to prove.

\bf{the Proof of theorem 2}.

The state of the suffix automaton correspond to the vertices of the suffix tree.

Consider an arbitrary transition $(x,y,c)$ in suffix automaton $DAWG(s)$. The presence of this transition means that $y$ is such a state, the equivalence class which contains the substring $longest(x) + c$. In inverted line $\overline{s}$ this means that $y$ is a state, which corresponds to a substring, $firstpos$ from which (in the text $\overline{s}$) coincides with $firstpos$ substring $c + \overline{longest(x)}$.

This means that:

$$ \overline{longest(y)} = ext[c, \overline{longest(x)}]. $$

The first part of the theorem is proved, it remains to prove the second part: that all continuous transitions in the automaton correspond to the suffix links in the tree. The continuous transition differs from the non-continuous so that $length(y) = length(x) + 1$, i.e. after ascribing the symbol $c$ we are in the condition string, the maximum of the equivalence class of this state. This means that when calculating the relevant extending links $ext[c, \overline{longest(x)}]$ we immediately got to the top of the tree, and not down to the nearest leaf nodes of the tree. Thus, attributing one character in the beginning, we were in another top of the tree --- so, if this is reversed suffix link tree.

The theorem is completely proved.

\bf{Theorem 3}. Having a suffix automaton $DAWG(s)$, within time $O(n)$ to construct a suffix tree $ST(\overline{s})$.

\bf{Theorem 4}. Having a suffix tree $ST(\overline{s})$, within time $O(n)$ to construct the suffix automaton $DAWG(s)$.

\bf{the Proof of theorem 3}.

A suffix tree $ST(\overline{s})$ will contain the same number of vertices, the number of States in $DAWG(s)$, and the top of the tree, resulting from the state of $v$ of the automaton, corresponds to a string of length $len(v)$.

According to theorem 1, the edges in the tree are formed like inverse suffix links, and arc labels can be found, based on the difference of $len$ States, and additionally knowing for each state machine, one any element of set $endpos$ (this one element of the set $endpos$ to support when you build the machine).

Suffix links in the tree we can construct by theorem 2: it is enough to view all solid transitions in the automaton, and for each such transition $(x,y)$ add link $link(y) = x$.

Thus, in time $O(n)$ we can construct a suffix tree with suffix links in it.

(If we consider $k$ of the alphabet is not constant, then all the rebuilding will take time $O (n \log k)$.)

\bf{the Proof of theorem 4}.

Suffix automaton $DAWG(s)$ will contain the same number of States how many vertices in $ST(\overline{s})$. Each state $v$ of its longest line is $longest(v)$ will correspond to the inverted path from the tree root to the vertex $v$.

According to theorem 2, to construct all transitions in suffix automaton, we need to find all widening reference $ext[c,v]$.

First, note that some of these extend links are obtained directly from the suffix links in the tree. In fact, if for any vertex $x$ we consider its suffix link $y = link(x)$, this means that we should hold the extend link from $y$ to $x$ on the first character of the string corresponding to the vertex $x$.

However, so we will find not all widening reference. Additionally have to iterate over the suffix tree from leaves to root, and for each vertex $v$ to see all her sons, for every son to see all widening reference $ext[c,w]$, and copy the link in a vertex $v$, if $c$ is a link from vertex $v$ has not yet been found:

$$ ext[c,v] = ext[c,w], ~~~~ \text{if $ext[c,w] = nil$.} $$

This process will work out over time $O (n)$, if we consider the alphabet size is constant.

Finally, we have to build suffix links in the machine, however, according to theorem 1, these suffix links are just like rib suffix tree $ST(\overline{s})$.

Thus, the described algorithm on time $O(n)$ builds on suffix automaton suffix tree for inverted rows.

(If we consider the $k$ of the alphabet --- are also variable, then the asymptotics will increase to $O (n \log k)$.)



\h2{ Application when solving problems }

Below we'll look at what tasks can be solved using suffix automaton.

We for simplicity we assume the alphabet size $k$ a constant that will allow us to consider the complexity of building the suffix automaton and the passage is constant.


\h3{ Verify }

\bf{Condition}. Given a text $T$, and receive requests in the form: given a string $P$, you want to check or not the string $P$ in a text $T$ as a substring.

\bf{Asymptotics}. The preprocessing $O (length (T))$ and $O (length (P))$ per query.

\bf{Solution}. Build a suffix automaton on the text $T$ for time $O (length (T))$.

How to answer on one request. Let the current state is a variable $v$, it is equal to the initial condition $t_0$. We will follow the characters of the string $P$, accordingly making the transition from the current state to $v$ in the new state. If at some point it happened that the transition from the current state according to the symbol was not --- the answer to the query is "no". If we could treat the entire row of $P$, then the answer to the query is "Yes".

It is clear that this will work for a time $O (length (P))$. Moreover, the algorithm actually looks for the length of the longest prefix of $P$ used in the text --- and if the input samples are such that these lengths are small, then the algorithm will work much faster than processing the whole string.


\h3{ the Number of distinct substrings }

\bf{Condition}. Given a string $S$. You want to know the number of different substrings.

\bf{Asymptotics}. $O (length (S))$.

\bf{Solution}. Build a suffix automaton for the string $S$.

In machine suffix of any substring of a string $S$ corresponds to some path in the automaton. Because duplicate rows in the machine can not be, then the answer to the problem is the \bf{number of different ways} in the automaton starting in the initial vertex of $t_0$.

Given that the suffix automaton is an acyclic graph, the number of different ways can be considered using dynamic programming.

Namely, let $d[v]$ is the number of different ways, starting with a state $v$ (including the path of length zero). Right then:

$$ d[v] = 1 + \sum_{w ~ : \atop (v,w,c) \in DAWG} d[w], $$

i.e. $d[v]$ can be expressed as the sum of answers for all sorts of transitions from the state of $v$.

The answer is the value $d[t_0]-1$ (the unit is taken to be the empty substring).


\h3{ length different substrings }

\bf{Condition}. Given a string $S$. You want to know the total length of all the different substrings.

\bf{Asymptotics}. $O (length (S))$.

\bf{Solution}. The decision task is similar to the previous one, only now we have to consider in the dynamics of two quantities: the number of distinct substrings of $d[v]$ and their total length $ans[v]$.

How to calculate $d[v]$, described in the previous task, and the value of $ans[v]$ can be calculated thus:

$$ ans[v] = \sum_{w ~ : \atop (v,w,c) \in DAWG} d[w] + ans[w], $$

i.e. we take the response for each vertex $w$, and add to it $d[w]$, thus attributing to the beginning of each line one character at a time.


\h3{ Lexicographically k-th substring }

\bf{Condition}. Given a string $S$. Requests --- number of $K_i$, and you want to find the $K_i$-th in the sorted order a substring of the string $S$.

\bf{Asymptotics}. $O (length (ans) \cdot Alphabet)$ per query (where $ans$ is the response to this query, $Alphabet$ --- the size of the alphabet).

\bf{Solution}. The solution to this problem is based on the same idea as the previous two tasks. Lexicographically $k$-th substring is lexicographically $k$-th path in the suffix slot. So considering for each state the number of paths from it, we can easily find $k$-th path, moving from the root machine.


\h3{ Smallest cyclic shift }

\bf{Condition}. Given a string $S$. You want to find the lexicographically smallest cyclic shift her.

\bf{Asymptotics}. $O (length (S))$.

\bf{Solution}. Build a suffix automaton for the string $S+S$. Then this machine will contain as paths all cyclic shifts of the string $S$.

Therefore, the problem is reduced to find in the machine lexicographically minimal path of length $length(S)$, which is done in a trivial way: we start in the initial state and each time are being greedy, going for the transition with minimal character.


\h3{ Number of entries }

\bf{Condition}. Given a text $T$, and receive requests in the form: given a string $P$, you want to know how many times the string $P$ is included in the text $T$ as a substring (occurrences may overlap).

\bf{Asymptotics}. The preprocessing $O (length (T))$ and $O (length (P))$ per query.

\bf{Solution}. Build a suffix automaton on the text $T$. 

Further, we need to make a preprocessing: for each state $v$ machine to count the number $cnt[v]$ size set $endpos(v)$. In fact, all the rows that match the same condition, included in $T$ the same number of times equal to the number of positions in the set $seconds$.

Clearly, however, to support multiple $endpos$ for all the States we can not, so learn to take only their sizes $cnt$.

To do this, proceed as follows. For each state, if it was not obtained by cloning (and the initial condition $t_0$ we also do not consider), initially assign $cnt = 1$. Then we will go over all of the States in descending order of their length $len$ and push the current value of $cnt[v]$ by the suffix link:

$$ cnt[link(v)] += cnt[v]. $$

It is argued that in the end we calculate for each state the correct values $cnt$.

Why this is true? Total number of States obtained by cloning is not exactly $length(S)$, and $i$-th of them appeared when we added the first $i$ characters. Therefore, each of these States we put in under this position, the processing which it appeared. Therefore, initially, each such state $cnt = 1$, and all the rest of state $cnt = 0$.

Then we perform for each $v$ such operation: $cnt[link(v)] += cnt[v]$. The meaning of this is that if the row corresponding to the state of $v$, dated $cnt[v]$ times, all the suffixes will meet the same.

Thus why we will not consider the same position multiple times? Because of each state, its value is "propisyvaetsya" just once, why couldn't it be that of the value "proposals" to a different state twice, in two different ways.

Thus, we have learned to consider those values of $cnt$ for all States of the automaton.

After this, the answer to the query is trivial --- it should simply return $cnt[t]$, where $t$ --- the state of the sample $P$.


\h3{ the Position of the first occurrence }

\bf{Condition}. Given a text $T$, and receive requests in the form: given a string $P$, you want to know the position of the first occurrence of the string $P$.

\bf{Asymptotics}. The preprocessing $O (length (T))$ and $O (length (P))$ per query.

\bf{Solution}. Build a suffix automaton on the text $T$.

To solve the problem, we also need to add in the preprocessing finding positions $firstpos$ for all States of the automaton, i.e. for each state of $v$ we want to find the position of $firstpos[v]$ the end of the first occurrence. In other words, we want to find in advance the minimum element of each set $endpos(v)$ (as is clearly to maintain all sets $endpos$ we can't).

\bf{to Maintain} these positions are $firstpos$ is easiest during the construction of the machine: when we create a new state $cur$ when the function $sa\_extend()$, then expose him:

$$ firstpos(cur) = len(cur) - 1 $$

(if we work in $0$-indexed).

Cloning the vertices of $q$ in $clone$ we set:

$$ firstpos(clone) = firstpos(q), $$

(because the other option values are only one - - - $firstpos(cur)$, which is clearly more).

Thus, the answer to the query --- it's just $firstpos(t)-length(P)+1$, where $t$ --- the state of the sample $P$.


\h3{ Position all occurrences }

\bf{Condition}. Given a text $T$, and receive requests in the form: given a string $P$, you have to print the positions of all its occurrences in the string $T$ (occurrences may overlap).

\bf{Asymptotics}. The preprocessing $O (length (T))$. The one request for $O (length (P) + answer (P))$, where $answer(P)$ is the size of the response, i.e. we will solve this problem in time of order of the size of input and output.

\bf{Solution}. Build a suffix automaton on the text $T$. Similar to the previous task, we calculate in the process of constructing an automaton for each state position $firstpos$ the end of the first occurrence.

Suppose now that a request has been received --- string $P$. Find out what state $t$ it corresponds to.

It is clear that $firstpos(t)$ should definitely log in to reply. What other positions need to find? We took into account the state of the automaton, containing the string $P$, but did not consider other conditions, which correspond to strings such that $P$ is a suffix.

In other words, we want to find all States from which \bf{achievable by the suffix links} state $t$.

Therefore, to solve the problem we need to store for each state a list of suffix links leading to it. The answer to the query then would be to make \bf{depth/width} for these inverse suffix links, starting from the state $t$.

This bypass will work for a time $O (answer (P))$, since we don't visit the same state twice (because of each state of the suffix link goes to only one, so there cannot be two paths leading to the same state).

It should be noted that the two States their values $firstpos$ \bf{to match}: if one condition was obtained by cloning the other. However, this does not affect the asymptotics, because each non-cloned node may be a maximum of one clone.

Moreover, you can easily get rid o recurring items, unless we add to the answer $firstpos$ from-clones. In fact, in any state-a clone of the suffix link leads from the initial state that the condition was cloned. Thus, if we for each state, note the flag $is\_clon$, and won't add to the answer $firstpos$ from the conditions for which $is\_clon = true$, we will receive all of the required $answer (P)$ positions without repeating.

Here is an outline of the implementation:

\code
struct state {
...
bool is_clon;
int first_pos;
vector<int> inv_link;
};


... after you build the machine ...
for (int v=1; v<sz; v++)
st[st[v].link].inv_link.push_back (v);
...


// the answer to the inquiry o all occurrences (possibly with repetitions)
void output_all_occurences (int v, int P_length) {
if (! st[v].is_clon)
cout << st[v].first_pos - P_length + 1 << endl;
for (size_t i=0; i<st[v].inv_link.size(); ++i)
output_all_occurences (st[v].inv_link[i], P_length);
}
\endcode


\h3{ Search shortest string that is not included in this }

\bf{Condition}. Given a string $S$, and set a specific alphabet. You want to find a string of minimum length that it does not occur in $S$ as a substring.

\bf{Asymptotics}. Solution for $O (length (S))$.

\bf{Solution}. Will solve a dynamic programming on the machine, built for the string $S$.

Let $d[v]$ is the response for the vertex $v$, i.e. we have already typed part of the substring, being in the state $v$, and want to find the minimum number of characters that need to add to go beyond the automatic, finding the non-existent transition.

Considered $d[v]$ is very simple. If $v$ there is no transition at least one symbol from the alphabet, then $d[v] = 1$: we can ascribe such a character and to step outside the machine, thereby obtaining a required line.

Otherwise, one symbol do not work, so we need to take the minimum of the answers on all sorts of characters:

$$ d[v] = 1 + \min_{w ~ : \atop (v,w,c) \in DAWG} d[w]. $$

The answer will be equal to $d[t_0]$, and the line can be restored by restoring how the dynamics turned out to be this minimum.


\h3{ Longest common substring of two strings }

\bf{Condition}. Given two strings $S$ and $T$. You want to find their longest common substring, i.e. a string $X$ that it is a substring of $S$ and $T$.

\bf{Asymptotics}. Solution for $O (length(S) + length(T))$.

\bf{Solution}. Build a suffix automaton for the string $S$.

We will now go through the string $T$, and for each prefix to find the longest suffix of the prefix, occurring in $S$. In other words, we are for each position in the string $T$ want to find longest common substring of $S$ and $T$, ending in this position.

To do this, we will maintain two variables: \bf{current status} $v$ \bf{current length} of $l$. These two variables will describe the current matching portion of: its length and the state that corresponds to it (without storage length cannot be avoided, since the same state can match several strings of different lengths).

Initially $p=t_0$, $l=0$, i.e. the match is empty.

Suppose now that we consider the character $T[i]$ and want to count the answer for him.

\ul{

\li If from the state of $v$ in the machine there is a transition for character $T[i]$, then we just are making this transition and increase $l$ by one.

\li If from the state of $v$ there are no required transition, then we should try to shorten the current matching part, which should follow the suffix link:

$$ v = link(v). $$

In this case the current length must be shortened, but leave the maximum possible. Obviously, for this we need to assign $l = len(v)$, since after the passage by the suffix link we will satisfy a substring of any length, which corresponds to this condition:

$$ l = len(v). $$

If the new state will again navigate to the required symbol, then again we must pass by the suffix link and to reduce $l$, and so on, until we find a transition (then proceed to item 1) or we don't get in the fictitious state of $-1$ (which means that the symbol $T[i]$ does not occur in $S$, so assigning $v=l=0$ and move on to the next $i$).

}

The answer to the problem will be the maximum of values $l$ for all time crawl.

The asymptotics of this pass is $O (length (T))$, because in one move, we can either increment $l$, or make multiple passes by the suffix link, each of which would strictly decrease the value of $l$. Therefore, reductions could not be greater than $length (T)$, that means linear complexity.

Implementation:

\code
string lcs (string s, string t) {
sa_init();
for (int i=0; i<(int)s.length(); ++i)
sa_extend (s[i]);

int v = 0, l = 0,
best = 0, bestpos = 0;
for (int i=0; i<(int)t.length(); ++i) {
while (v && ! st[v].next.count(t[i])) {
v = st[v].link;
l = st[v].length;
}
if (st[v].next.count(t[i])) {
v = st[v].next[t[i]];
l++;
}
if (l > best)
best = l, bestpos = i;
}
return t.substr (bestpos-best+1, best);
}
\endcode


\h3{ Greatest common substring of multiple strings. }

\bf{Condition}. Given $K$ strings $S_i$. You want to find their longest common substring, i.e. a string $X$ that it is a substring of all $S_i$.

\bf{Asymptotics}. Solution for $O (\sum length(S_i) \cdot K)$.

\bf{Solution}. Glue all the strings $S_i$ into one string $T$ of pinning after each string $S_i$ its own symbol-delimiter $D_i$ (i.e. typing $K$ additional specials. $D_i$):

$$ T = S_1 ~ D_1 ~ S_2 ~ D_2 ~ \ldots ~ D_k S_k. $$

Build rows $T$ suffix automaton.

Now we need to find this line in the machine, which contains all strings $S_i$, and the added specials. characters. Note that if a substring is included in a certain line of $S_j$, in machine suffix of this substring will be the path containing the symbol $D_j$, and contains no other symbols $D_1, \ldots, D_{j-1}, D_{j+1}, \ldots, D_k$.

Thus, we need to calculate the reachability for each automaton state and each $D_i$ is there a path containing the delimiter $D_i$, and contains no other delimiter. It's easy to do the depth/width or lazy dynamics. Then the answer to the problem is the line $longest(v)$ to state $v$, from which we found paths for all symbols.


\h2{ Problem in online judges }

Tasks that can be solved using suffix automaton:

\ul{

\li \href=http://www.spoj.pl/problems/SUBLEX/{SPOJ #7258 SUBLEX \bf{"Lexicographical Substring Search"} ~~~~ [difficulty: medium]}

}






\h2{ Literature }

Let us give first the list of the first works related to suffix automata:

\ul{

\li A. Blumer, J. Blumer, A. Ehrenfeucht, D. Haussler, R. McConnell. \bf{Linear Size Finite Automata for the Set of All Subwords of a Word. An Outline of Results} [1983]

\li A. Blumer, J. Blumer, A. Ehrenfeucht, D. Haussler. \bf{The Smallest Automaton Recognizing the Subwords of a Text} [1984]

\li Maxime Crochemore. \bf{Optimal Factor Transducers} [1985]

\li Maxime Crochemore. \bf{Transducers and Repetitions} [1986]

\li A. Nerode. \bf{Linear automaton transformations} [1958]

}

In addition, in more modern sources, this topic is discussed in many books on string algorithms:

\ul{

\li Maxime Crochemore, Rytter Wowjcieh. \bf{Jewels of Stringology} [2002]

\li Bill Smyth. \bf{Computing Patterns in Strings} [2003]

\li bill Smith. \bf{Methods and algorithms of calculations on lines} [2006]

}
