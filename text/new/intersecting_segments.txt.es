
\h1{ Search for pairs of intersecting line segments with cleanup direct algorithm in O (N log N) }

Given $n$ line segments in the plane. You want to check, cross paths with each other at least two of them. (If the answer is Yes --- output this pair of intersecting segments; among the several replies, it helps to choose any of them.)

A naïve algorithm to solve --- iterate through $O (n^2)$ all pairs of segments and check for each pair intersect or not. This article describes an algorithm with running time $O (n \log n)$, which is based on the principle of \bf{scan (cleanup) direct} (in English: "sweep line").


\h2{ Algorithm }

Will mentally draw vertical line $x = -\infty$ and we start to move this line to the right. In the course of motion this straight line will meet with cuts, and at any time each segment will intersect with our direct at one point (we will assume that no vertical line segments).

\img{sweep_line_1.png}

Thus, for each cut in some time it will appear on scan-line, then the direct motion will move and this point, and, finally, at some point the segment will disappear from the line.

We are interested in \bf{the relative order of segments} in the vertical direction. Namely, we will store a list of segments that intersect the scan line in the given time, where segments are sorted by their $y$-coordinate on the scanning line.

\img{sweep_line_2.png}

This order is interesting in that the overlapping segments will have the same $y$-coordinate at least one time:

\img{sweep_line_3.png}

We formulate a key statement:

\ul{

\li For finding intersecting pairs is enough to consider at each fixed position of the scan-line \bf{only neighboring segments}.

\li it is Sufficient to consider a direct scan is not valid in all possible positions $(-\infty \ldots +\infty)$, and \bf{only in those positions, when there are new cuts or disappear old}. In other words, it is enough to be limited only by provisions equal to the abscissa of the points of all the segments.

\li When a new cut is enough \bf{insert} it to the desired location in the list obtained for the previous scan-line. Check for the intersection of need \bf{added cut only with its immediate neighbors in the list at the top and bottom}.

\li on failure cut enough \bf{delete} from the current list. After that it \bf{check for intersection with upper and lower neighbors} in the list.

\li Other changes in the order of the segments in the list except the one described, does not exist. Other checks for intersections is not necessary to make.

}

To understand the truth of these allegations is sufficient to the following observations:

\ul{

\li Two non-intersecting segments will never change their \bf{relative order}.

In fact, if one first cut was higher than the other, and then became lower, then between these two moments happened in the intersection of these two segments.

\li to Have the same $y$-coordinates of two non-intersecting segments also can't.

\li it follows From this that at the time of occurrence of the segment can be found in the queue position for this segment, and this segment rearranged in line is not necessary: it \bf{order relative to other segments in the queue will not change}.

\li Two intersecting cut at the time of the point of intersection will be \bf{neighbors} each other in the queue.

\li Hence, for finding intersecting pairs of segments it is enough to check for the intersection of only those pairs of segments that sometime during the movement of the scan-line at least once \bf{were neighbors to each other}.

It is easy to notice that it is enough just to check add segment with its upper and lower neighbors, and when removing cut --- its upper and lower neighbors (which, after removal become neighbors of each other).

\li you Should pay attention that at a fixed position scanning direct we \bf{first} should produce \bf{add} all of the segments appear here, and only \bf{then} --- \bf{delete} here endangered all segments.

Thus, we do not skip lines intersect at the top: i.e. those cases where two segments have a common vertex.

\li note that \bf{vertical lines} actually does not affect the correctness of the algorithm.

These segments are distinguished by the fact that they appear and disappear at the same time. However, due to the previous observations, we know that initially all segments are added to the queue and will then be removed. Therefore, if a vertical cut intersects with some other open at this point, a segment (including vertical), it will be detected.

What place in the queue to place the vertical lines? After a vertical cut has one particular $y$-coordinates, it extends to the whole segment on the $y$-coordinate. However, it is clear that the $y$-coordinate can take any coordinate of this segment.

}

Thus, the whole algorithm will make no more than $2n$ of the intersection tests on pairs of segments, and will make $O (n)$ operations with the queue lengths (on $O(1)$ operations at the moments of appearance and disappearance of each segment).

Final \bf{asymptotics} of the algorithm is thus $O (n \log n)$.


\h2{ the Implementation }

We present the complete implementation of the described algorithm:

\code
const double EPS = 1E-9;

struct pt {
double x, y;
};

struct seg {
pt p, q;
int id;

double get_y (double x) const {
if (abs (p.x - q.x) < EPS) return p.y;
return p.y + (q.y - p.y) * (x - p.x) / (q.x - p.x);
}
};


inline bool intersect1d (double l1, double r1, double l2, double r2) {
if (l1 > r1) swap (l1, r1);
if (l2 > r2) swap (l2, r2);
return max (l1, l2) <= min (r1, r2) + EPS;
}

inline int vec (const pt & a, const pt & b, const pt & c) {
double s = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
return abs(s)<EPS ? 0 : s>0 ? +1 : -1;
}

bool intersect (const seg & a, const seg & b) {
return intersect1d (a.p.x, a.q.x b.p.x b.q.x)
&& intersect1d (a.p.y, a.q.y, b.p.y, b.q.y)
&& vec (a.p, a.q, b.p) * vec (a.p, a.q, b.q) <= 0
&& vec (b.p, b.q, a.p) * vec (b.p, b.q, a.q) <= 0;
}


bool operator< (const seg & a, const seg & b) {
double x = max (min (a.p.x, a.q.x), min (b.p.x b.q.x));
return a.get_y(x) < b.get_y(x) - EPS;
}


struct event {
double x;
int tp, id;

event() { }
event (double x, int tp, int id)
: x(x), tp(tp), id(id)
{ }

bool operator< (const event & e) const {
if (abs (x - e.x) > EPS) return x < e.x;
return tp > e.tp;
}
};

set<seg> s;
vector < set<seg>::iterator > where;

inline set<seg>::iterator prev (set<seg>::iterator it) {
return it == s.begin() ? s.end() : --it;
}

inline set<seg>::iterator next (set<seg>::iterator it) {
return ++it;
}

pair<int,int> solve (const vector<seg> & a) {
int n = (int) a.size();
vector<event> e;
for (int i=0; i<n; ++i) {
e.push_back (event (min (a[i].p.x, a[i].q.x) +1, i));
e.push_back (event (max (a[i].p.x, a[i].q.x), -1, i));
}
sort (e.begin(), e.end());

s.clear();
where.resize (a.size());
for (size_t i=0; i<e.size(); ++i) {
int id = e[i].id;
if (e[i].tp == +1) {
set<seg>::iterator
nxt = s.lower_bound (a[id]),
prv = prev (nxt);
if (nxt != s.end() && intersect (*nxt, a[id]))
return make_pair (nxt->id, id);
if (prv != s.end() && intersect (*prv, a[id]))
return make_pair (prv->id, id);
where[id] = s.insert (nxt, a[id]);
}
else {
set<seg>::iterator
nxt = next (where[id]),
prv = prev (where[id]);
if (nxt != s.end() && prv != s.end() && intersect (*nxt, *prv))
return make_pair (prv->id, nxt->id);
s.erase (where[id]);
}
}

return make_pair (-1, -1);
}
\endcode

The main function here --- $\rm solve ()$ that returns the number of segments is found intersecting, or $(-1, -1)$ if the intersection is missing.

Check for intersection of two intervals is the function $\rm intersect ()$ using \algohref=segments_intersection_checking{algorithm based on the oriented area of a triangle}.

Turn segments in the global variable $s$ --- $\rm set<event>$. The iterator indicating the position of each segment in the queue (for easy removal of the segments from the queue) are stored in the global array $\rm where$.

Additionally, two auxiliary functions $\rm prev()$ and $\rm next ()$ that returns the iterator to the previous and next elements (or $\rm end ()$ if none exists).

The constant $\EPS rm$ denotes the error of comparing two real numbers (basically, it is used to perform two segments in the intersection).
