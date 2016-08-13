\h1{Test two segments for intersection}

Given two segments $AB$ and $CD$ (they can degenerate into a point). You want to check, they overlap or not.

If you want to find the point (points) of intersection, we see \algohref=segments_intersection{appropriate article}.


\h2{the oriented area of a triangle}

Use \algohref=oriented_area{Oriented area of a triangle and the predicate 'clockwise'}. Indeed, to make the segments $AB$ and $CD$ intersect, it is necessary and sufficient that the points $A$ and $B$ were on different sides of the line $CD$, and, similarly, the point $C$ and $D$ --- on different sides of line $AB$. You can check this by calculating the oriented area of the corresponding triangles and comparing their marks.

The only thing you should pay attention --- boundary cases when some points fall on the line. Thus there is only a special case, when the above check will not work --- the case when both are cut \bf{collinear}. This case should be considered separately. It is enough to check that the projections of the two segments on the axis $X$ and $Y$ intersect (often this test is called the "bounding box test").

In General, this method is more simple than the one that will be given below (which produces the intersection of two straight lines), and has fewer special cases, however its main drawback --- the fact that he finds the point of intersection.

\bf{Implementation}:
\code
struct pt {
int x, y;
};

inline int area (pt a, pt b, pt c) {
return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

intersect_1 inline bool (int a, int b, int c, int d) {
if (a > b) swap (a, b);
if (c > d) swap (c, d);
return max(a,c) <= min(b,d);
}

bool intersect (pt a, pt b, pt c, pt d) {
return intersect_1 (a.x b.x, c.x d.x)
&& intersect_1 (a.y, b.y, c.y, d.y)
&& area(a,b,c) * area(a,b,d) <= 0
&& area(c,d,a) * area(c,d,b) <= 0;
}
\endcode

In order to optimize the check for bounding box rendered in the beginning, to calculate the area --- because it's more "easy" test.

Of course, this code is applicable to the case of real coordinates, just comparisons with zero should be made on the Epsilon (and to avoid the multiplication of the two values is a real-valued $\rm area()$, multiplying instead of their characters).


\h2{the Second method: the intersection of two straight lines}

Instead of crossing segments execute \algohref=lines_intersection{two intersecting lines}, as a result, if not a direct parallel, get some point that has to be checked for belonging to both intervals; it is enough to verify that this point belongs to both segments in a projection on the axis $X$ axis and $Y$.

If the direct appeared to be parallel, if they do not coincide, the segments do not intersect exactly. If direct match, then the segments lie on the same line, and to check their intersection is enough to verify that intersect their projections on the axis $X$ and $Y$.

There is still a special case when one or both cut \bf{degenerate} in point: in this case there direct incorrect, and this method is inapplicable (this case will have to be dealt with separately).

\bf{Implementation} (excluding the case of degenerate segments):

\code
struct pt {
int x, y;
};

const double EPS = 1E-9;

inline int det (int a, int b, int c, int d) {
return a * d - b * c;
}

inline bool between (int a, int b, double c) {
return min(a,b) <= c + EPS && c <= max(a,b) + EPS;
}

intersect_1 inline bool (int a, int b, int c, int d) {
if (a > b) swap (a, b);
if (c > d) swap (c, d);
return max(a,c) <= min(b,d);
}

bool intersect (pt a, pt b, pt c, pt d) {
int A1 = a.y-b.y, B1 = b.x-a.x, C1 = -A1*a.x - B1*a.y;
int A2 = c.y-d.y, B2 = d.x-c.x, C2 = -A2*c.x - B2*c.y;
int zn = det (A1, B1, A2, B2);
if (zn != 0) {
double x = - det (C1, B1, C2, B2) * 1. / zn;
double y = - det (A1, C1, A2, C2) * 1. / zn;
return between (a.x b.x, x) && between (a.y, b.y, y)
&& between (c.x d.x, x) && between (c.y, d.y, y);
}
else
return det (A1, C1, A2, C2) == 0 && det (B1, C1, B2, C2) == 0
&& intersect_1 (a.x b.x, c.x d.x)
&& intersect_1 (a.y, b.y, c.y, d.y);
}
\endcode

Here we compute the coefficient of $\rm zn$ --- the denominator in the formula for Cramer. If ${\rm zn} = 0$, the coefficients $A$ and $B$ are proportional to direct, and direct parallel or coincide. In this case we need to check for match or not, it is necessary to check that the coefficients $C$ of direct proportional with the same coefficient, which is enough to calculate two of the following keys, if they are both zero, then the direct match:
$$ \left|\matrix{ A_1 & C_1 \cr A_2 & C_2 }\right|, \left|\matrix{ B_1 & C_1 \cr B_2 & C_2 }\right| $$

If ${\rm zn} \ne 0$, then the lines meet, and by the Cramer formula, we find the intersection point $(x,y)$ and check that it belongs to both segments.

It should be noted that if the original coordinates of the points were real-valued, it is necessary to normalize a direct (i.e. to bring them to such a condition that the sum of the squares of the coefficients $a$ and $b$ equal to one), otherwise the error in the direct comparison of the parallelism and the coincidence might be too big.
