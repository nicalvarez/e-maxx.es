
\h1{ Suffix tree. The Algorithm Ukkonen }

This article is a temporary stub, and does not contain any descriptions.

Description of the algorithm of Ukkonen can be found, for example, in the book of Gasfield "Strings, trees and sequences in algorithms".


\h2{ the implementation of the algorithm of Ukkonen }

This algorithm constructs a suffix tree for given string of length $n$ at time $O (n \log k)$, where $k$ is the alphabet size (if it is considered a constant, the asymptotics is obtained to $O (n)$).

The input data for the algorithm are the string $s$ and its length $n$, which are passed in as global variables.

Main function --- $\rm build\_tree$, it builds a suffix tree. The tree is stored as an array of structures $\rm node$, where ${\rm node}[0]$ --- the root of the suffix tree.

For purposes of simplicity of code edges are stored in the same structures: for each vertex in the structures of $\rm node$ data is recorded on the edge, part of her ancestor. Overall, every $\rm node$ stores as $(l,r)$, define a label $s[l..r-1]$ edges in ancestor, $\rm par$ --- the vertex is-ancestor $\rm link$ --- the suffix link, $\rm next$ --- the list of outgoing edges.

\code
string s;
int n;

struct node {
int l, r, par, link;
map<char,int> next;

node (int l=0, int r=0, int par=-1)
: l(l), r(r), par(par), link(-1) {}
int len() { return r - l; }
int &get (char c) {
if (!next.count(c)) next[c] = -1;
return next[c];
}
};
node t[MAXN];
int sz;

struct state {
int v, pos;
state (int v, int pos) : v(v), pos(pos) {}
};
state ptr (0, 0);

state go (state st, int l, int r) {
while (l < r)
if (st.pos == t[st.v].len()) {
st = state (t[st.v].get( s[l] ), 0);
if (st.v == -1) return st;
}
else {
if (s[ t[st.v].l + st.pos ] != s[l])
return state (-1, -1);
if (r-l < t[st.v].len() - st.pos)
return state (st.v, st.pos + r-l);
l += t[st.v].len() - st.pos;
st.pos = t[st.v].len();
}
return st;
}

int split (state st) {
if (st.pos == t[st.v].len())
return st.v;
if (st.pos == 0)
return t[st.v].par;
node v = t[st.v];
int id = ++sz;
t[id] = node (v.l, v.l+st.pos, v.par);
t[v.par].get( s[v.l] ) = id;
t[id].get( s[v.l+st.pos] ) = st.v;
t[st.v].par = id;
t[st.v].l += st.pos;
return id;
}

int get_link (int v) {
if (t[v].link != -1) return t[v].link;
if (t[v].par == -1) return 0;
int to = get_link (t[v].par);
return t[v].link = split (go (state(to,t[to].len()), t[v].l + (t[v].par==0), t[v].r));
}

void tree_extend (int pos) {
for(;;) {
state nptr = go (ptr, pos, pos+1);
if (nptr.v != -1) {
ptr = nptr;
return;
}

int mid = split (ptr);
int leaf = sz++;
t[leaf] = node (pos, n, mid);
t[mid].get( s[pos] ) = leaf;

ptr.v = get_link (mid);
ptr.pos = t[ptr.v].len();
if (!mid) break;
}
}

void build_tree() {
sz = 1;
for (int i=0; i<n; ++i)
tree_extend (i);
}
\endcode


\h2{ Concise implementation }

Let us give the following compact implementation of the algorithm of Ukkonen proposed \href=http://codeforces.EN/profile/freopen{freopen}:

\code
const int N=1000000,INF=1000000000;
string a;
int t[N][26],l[N],r[N],p[N],s[N],tv,tp,ts,la;

void ukkadd (int c) {
suff:;
if (r[tv]<tp) {
if (t[tv][c]==-1) { t[tv][c]=ts; l[ts]=la;
p[ts++]=tv; tv=s[tv]; tp=r[tv]+1; goto suff; }
tv=t[tv][c]; tp=l[tv];
}
if (tp==-1 || c==a[tp]-'a') tp++; else {
l[ts+1]=la; p[ts+1]=ts;
l[ts]=l[tv]; r[ts]=tp-1; p[ts]=p[tv]; t[ts][c]=ts+1; t[ts][a[tp]-'a']=tv;
l[tv]=tp; p[tv]=ts; t[p[ts]][a[l[ts]]-'a']=ts; ts+=2;
tv=s[p[ts-2]]; tp=l[ts-2];
while (tp<=r[ts-2]) { tv=t[tv][a[tp]-'a']; tp+=r[tv]-l[tv]+1;}
if (tp==r[ts-2]+1) s[ts-2]=tv; else s[ts-2]=ts; 
tp=r[tv]-(tp-r[ts-2])+2; goto suff;
}
}

void build() {
ts=2;
tv=0;
tp=0;
fill(r,r+N,(int)a.size()-1);
s[0]=1;
l[0]=-1;
r[0]=-1;
l[1]=-1;
r[1]=-1;
memset (t, -1, sizeof t);
fill(t[1],t[1]+26,0);
for (la=0; la<(int)a.size(); ++la)
ukkadd (a[la]-'a');
}
\endcode

The same code, commented:

\code
const int N=1000000, // maximal number of nodes in suffix tree
INF=1000000000; // a constant of "infinity"
string a; // input string for which code is to be constructed
int t[N][26], // array of transitions (state, letter)
l[N], // left 
r[N], // right boundary of the substring of a corresponding to the edge part of the top
p[N], // the parent of vertex
s[N], // suffix link
tv, // the top of the current suffix (if we are in the middle of the fin, the lower fin top)
tp, // position in the row corresponding to the location on the edge (from l to[tv] to r[tv], inclusive)
ts, // number of vertices
la; // current character in the string

void ukkadd(int c) { // append to the tree the symbol c
suff:; // will come here after each transition to the suffix (and re-add the symbol)
if (r[tv]<tp) { // check, whether we got out beyond the current edges
// if you got out, going to find the next edge. If it is not - create a sheet and attach to the tree
if (t[tv][c]==-1) {t[tv][c]=ts;l[ts]=la;p[ts++]=tv;tv=s[tv];tp=r[tv]+1;goto suff;}
tv=t[tv][c];tp=l[tv]; // otherwise just move on to the next edge
}
if (tp==-1 || c==a[tp]-'a') tp++; else { // if the letter on the edge coincides with c then go along the edge, but otherwise
// shared edge of two. In the middle is the top of the ts
l[ts]=l[tv];r[ts]=tp-1;p[ts]=p[tv];t[ts][a[tp]-'a']=tv;
// put the leaf of ts+1. It corresponds to transition c.
t[ts][c]=ts+1;l[ts+1]=la;p[ts+1]=ts;
// update the parameters of the current vertex. Not to forget the ancestor transition from tv to ts.
l[tv]=tp;p[tv]=ts;t[p[ts]][a[l[ts]]-'a']=ts;ts+=2;
// prepare for descent: ascended to the edge and moved by the suffix link.
// tp is going to celebrate where we are in the current suffix.
tv=s[p[ts-2]];tp=l[ts-2];
// until the current suffix is not over, stomp down
while (tp<=r[ts-2]) {tv=t[tv][a[tp]-'a'];tp+=r[tv]-l[tv]+1;}
// if we're at the top, then put it in a suffix link, otherwise put in ts
// (in fact on the trail. iteration we will create a ts).
if (tp==r[ts-2]+1) s[ts-2]=tv; else s[ts-2]=ts; 
// set tp to a new edge and go to add a letter to the suffix.
tp=r[tv]-(tp-r[ts-2])+2;goto suff;
}
}

void build() {
ts=2;
tv=0;
tp=0;
fill(r,r+N,(int)a.size()-1);
// initialize the data for the tree root
s[0]=1;
l[0]=-1;
r[0]=-1;
l[1]=-1;
r[1]=-1;
memset (t, -1, sizeof t);
fill(t[1],t[1]+26,0);
// add the text in the tree by one letter
for (la=0; la<(int)a.size(); ++la)
ukkadd (a[la]-'a');
}
\endcode



\h2{ Problem in online judges }

Tasks that can be solved by using a suffix tree:

\ul{

\li \href=http://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=1620{UVA #10679 \bf{"I Love Strings!!!"} ~~~~ [difficulty: medium]}

}
