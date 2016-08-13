
\h1{ Transform geometric inversion }

Transformation of geometric inversion (inversive geometry) is a special type of transformation of points in the plane. The practical benefit of this conversion is that often it allows us to reduce the solution of geometrical tasks \bf{circles} to the solution of the corresponding problem \bf{direct}, which usually has a much simpler solution.

Apparently, the founder of this area of mathematics was Ludwig Immanuel Magnus (Ludwig Immanuel Magnus), who in 1831 published an article about the inverse transformation.


\h2{ Definition }

Fix a circle with center at the point $O$ of radius $r$. Then \bf{inversion} of a point $P$ on this circle is such a point $P^\prime$, which lies on the ray $OP$, and the distance imposed the condition:

$$ OP \cdot OP^\prime = r^2. $$

\img{inversion_3.png}

If we assume that the centre $O$ of the circle coincides with the origin, we can say that the point $P^\prime$ has the same polar angle, and $P$, and the distance is calculated by the previous formula.

In terms of \bf{complex numbers} transform inversion is expressed is quite simple, if we assume that the centre $O$ of the circle coincides with the origin:

$$ z^\prime = r^2 \cdot \frac{ z }{ |z|^2 }. $$

Using a conjugate element $\overline{z}$ one can obtain a simpler form:

$$ z^\prime = \frac{ r^2 }{ \overline{z} }. $$

The use of inversion (at the point-the middle of the Board) to the image of a chessboard gives an interesting picture (right):

\img{inversion_9.png}


\h2{ Properties }

It is obvious that any point lying \bf{circle}, which is the transformation of inversion, when the display goes into itself. Any point lying \bf{inside} of the circle, goes in \bf{external} area, and Vice versa. It is believed that the center of the circle moves to the point "infinity" of $\infty$, and the point of "infinity" --- on the contrary, in the center of the circle:

$$ (O)^\prime = \infty, $$
$$ (\infty)^\prime = O. $$

It is obvious that the repeated application of the inversion conversion \bf{draws} the first use of --- all points back:

$$ \left( P^\prime \right) ^\prime \equiv P. $$


\h3{ Generalized circle }

A generalized circle is either a circle, either straight (it is believed that this is also a circle, but having infinite radius).

A key property of inversion conversion --- that in its application the generalized circle \bf{always turns into a generalized circle} (it is assumed that the inversion transformation pixel by pixel is applied to all points of the shape).

Now we will see what happens to straight lines and circles when you transform inversion.


\h3{ Inversion of the line passing through the point $O$ }

It is claimed that any the line through $O$, after conversion, the inversion of \bf{not changed}.

In fact, any point of this line, except $O$ and $\infty$, follows the definition in point of this line (and in the end, the resulting points fill in the whole entire direct, because the inversion transformation is reversible). Remain the point $O$ and $\infty$, but in the inversion they pass each other, so the proof is completed.


\h3{ Inversion of line not passing through the point $O$ }

It is alleged that any such direct go \bf{in a circle} passing through $O$.

\img{inversion_4.png}

Consider any point $P$ of the straight line, and consider the point $Q$ --- closest to $O$ point straight. It is clear that the segment $OQ$ is perpendicular to a straight line, but because they formed by the angle $\angle pqo extension$ --- straight.

Now let's use \bf{Lemma about equal angles}, which we will prove later, this Lemma gives us the equality:

$$ \angle pqo extension = \angle Q^\prime P^\prime O. $$

Therefore, the angle $\angle Q^\prime P^\prime O$ too direct. Since we take the point $P$ any, it turns out that the point $P^\prime$ lies on the circle constructed in $O Q^\prime$ as diameters. It is easy to understand that in the end all points direct will cover the entire circle as a whole, therefore, the claim is proved.


\h3{ Inversion of a circle passing through the point $O$ }

Any such circle go \bf{direct} not passing through the point $O$.

In fact, this immediately follows from the previous paragraph, if we consider reversibility of the transform inversion.


\h3{ Inversion of a circle not passing through the point $O$ }

Any such circle go \bf{in a circle}, still not passing through the point $O$.

\img{inversion_5.png}

In fact, consider any circle $Z$ with center at $O_2$. Connect centers $O$ and $O_2$ of the circles and straight; this straight line crosses the circle $Z$ in two points $S$ and $T$ (obviously, $ST$ - diameter of $Z$).

Now consider any point $P$, all on the circle $Z$. The angle $\angle SPT$ direct for any such point, but the result of \bf{Lemma about equal angles} also needs to be direct and angle $\angle S^\prime P^\prime T^\prime$, which implies that the point $P^\prime$ lies on the circle constructed on segment $S^\prime T^\prime$ as diameters. Again, it is easy to understand that all the images $P^\prime$ in the end will cover this circle.

It is clear that this new circle may not pass through $O$: otherwise the point $\infty$ would have to belong to the old circle.


\h3{ Lemma about equal angles }

This is a helper property that was used above in the analysis of the results of the transform inversion.

\h4{ Wording }

Consider any two points $P$ and $Q$, and is applicable to the transformation of inversion, we get the point $P^\prime$ and $Q^\prime$. Then the following angles are equal:

$$ \angle pqo extension = \angle Q^\prime P^\prime O $$
$$ \angle QPO = \angle P^\prime Q^\prime O. $$

\h4{ Proof }

Let us prove that the triangles $\triangle pqo extension$ and $\triangle Q^\prime P^\prime O$ such (the order of vertices is important!).

\img{inversion_1.png}

In fact, by definition, the inversion conversion:

$$ OP \cdot OP^\prime = r^2, $$
$$ OQ \cdot OQ^\prime = r^2, $$

whence we obtain the equality:

$$ OP \cdot OP^\prime = OQ \cdot OQ^\prime, $$
$$ \frac{ OP }{ OQ } = \frac{ OQ^\prime }{ OP^\prime }. $$

Thus, the triangles $\triangle pqo extension$ and $\triangle Q^\prime P^\prime O$ have a common corner and two adjacent sides proportional, therefore, these triangles are similar, because corresponding angles are the same.

\h4{ Corollary from Lemma }

If any given three points $P$, $Q$, $R$ and a point $R$ lies on the segment $OQ$, is:

$$ \angle QPR = \angle Q^\prime P^\prime R^\prime, $$

moreover, these angles are oriented in different directions (i.e., if we consider these two angles as oriented, they are of a different sign).

\img{inversion_2.png}

For the proof note that $\angle QPR$ is the difference of two angles $\angle QPO$ and $\angle RPO$, each of which can apply Lemma about equal angles:

$$ \angle QPR = \angle QPO - \angle RPO = \angle P^\prime Q^\prime O \angle P^\prime R^\prime O = \angle R^\prime P^\prime Q^\prime = \angle Q^\prime P^\prime R^\prime. $$

In the implementation of the last transition we have changed the order of points, which means that we have changed the orientation of the angle is reversed.


\h3{ conformance }

The transformation of inversion is conformal, i.e. \bf{preserves angles at points of intersection of curves}. Thus, if the angles to consider as oriented, the orientation angles when applying the inversion is reversed.

\img{inversion_6.png}

For \bf{proof} consider any two curves intersecting at the point $P$ and with tangent. Let the first curve on the point $Q$, the second one --- point of $R$ (we'll keep the limit to $P$).

Obviously, after applying the inversion curves will continue to intersect (unless, of course, they do not pass through the point $O$, but this is the case we consider), and the point of their intersection be $P^\prime$.

Given that the point $R$ lies on the line connecting $O$ and $Q$, we get that can apply the result from Lemma equal angles, from which we get:

$$ \angle QPR = - \angle Q^\prime P^\prime R^\prime, $$

where under the sign "minus" means that the angles are oriented in different directions.

Letting the point $Q$ and $R$ to the point $P$, in the limit we get that this equality --- the expression of the angle between intersecting curves that we wanted to prove.


\h3{ Property reflection }

If $M$ is-is the generalized circle, the transformation of inversion it \bf{saved} when and only when $M$ \bf{orthogonal} of the circle $C$, relative to which the inversion ($M$ and $C$ are considered different).

The proof of this property is interesting because it \bf{demonstrates} the application of geometric inversion to avoid circles and simplify the task.

The first step \bf{proof} will be an indication of the fact that $M$ and $C$ have at least two points of intersection. In fact, the transformation of inversion relative to $C$ displays the inside of the circle in her appearance and Vice versa. Once $M$ after the transformation has not changed, it means that it contains points both from the inside and from the exterior of the circle $C$. Hence it follows that the points of intersection of two (one she can't be --- it means the touching of two circles, but in this case, obviously, to be the condition may not; be the same as the circle also can not by definition).

We will designate one point of intersection through $A$, another --- through $B$. Consider an arbitrary circle with center at the point $A$, and perform the transformation of inversion. Note that the circle $C$, and the generalized circle of $M$ should go into intersecting straight lines. Considering conformal transformation of inversion, we get that $M$ and $M^\prime$ coincide if and only if the angle between two intersecting straight line (in fact, the first transform inversion, --- relative to $C$, --- changes the direction of the angle between the circles on the opposite, so if the circle coincides with its inversion, the angles between intersecting straight lines on both sides must be identical, and equal to $\frac{ 180 }{ 2 } = 90$ degrees).


\h2{ Practical application }

It is worth noting that when used in the calculations need to take into account large \bf{error} introduced by the transformation of inversion: there can be a fractional number of very small orders of magnitude, and is usually due to the high accuracy of the inversion method works well only with relatively small coordinates.


\h3{ Constructing shapes after inversion }

In software computing often more convenient and reliable to use ready formulas for the coordinates and radii of the resulting generalized circles, and to restore every time direct/the circle in two points. If direct is sufficient to take any two points and compute their images and join a line, with circles much more difficult.

If we want to find the circumference, resulting from the inversion of direct, according to the above calculations, it is necessary to find the nearest to the center of inversion is a point $Q$ of a straight line, to apply the inversion (after a certain point $Q^\prime$), and then the desired circle will have diameter $O Q^\prime$.

Now suppose we want to find the circumference, the resulting inversion is another circle. Generally speaking, the center of the new circle --- not the same as the old image of the center of the circle. To determine the center of a new circle, you can use this trick: to pass through the inversion center and the center of the old circle line to see points of intersection with the old circle --- let it be the point $S$ and $T$. Cut $ST$ forms the diameter of the old circle, and it is easy to understand that after the inversion of this segment will continue to form the diameter. Consequently, the center of the new circle can be found as the arithmetic mean of the points in $S^\prime$ and $T^\prime$.


\h3{ Parameters of the circle after inversion }

Required for a given circumference (according to the known coordinates of its center $(x_0,y_0)$ and radius $r_0$) to determine, in which circle she will go after transformation, the inversion with respect to a circle centered at $(x_c,y_c)$ and a radius $r$.

I.e. we solve the problem described in the previous paragraph, but I want to obtain a solution in analytical form.

The answer is in the form of formulas:

$$ x^\prime = x_c + s (x_0 - x_c), $$
$$ y^\prime = y_c + s (y_0 - y_c), $$
$$ r^\prime = |s| \cdot r_0, $$

where

$$ s = \frac{ r^2 }{ (x_0 - x_c)^2 + (y_0 - y_c)^2 - r_0^2 }. $$

Mnemonically these formulas can be memorized as follows: the center of the circle becomes "almost" like transformation of inversion, only in the denominator in addition to $|z|^2 = (x_0 - x_c)^2 + (y_0 - y_c)^2$ appeared subtrahend $r_0^2$.

These formulas are derived exactly as described in the previous paragraph the algorithm: are the expressions for the two diametrical points of $S$ and $T$, and then applies inversion, and then the arithmetic mean of their coordinates. Similarly, we can calculate the radius as half the length of the cut to $ST$.


\h3{ used in evidence: the problem of partitioning points by a circle }

Given $2n$ distinct points in the plane and an arbitrary point $O$ that is different from all the others. To prove that there is a circle passing through the point $O$, such that inside and outside it will lay the same number of points set, i.e., $n$ pieces.

For \bf{proof} we will convert the inversion of the selected point $O$ (with any radius, for example, $r=1$). Then the desired circle will correspond to a straight line, not passing through $O$. And on one side of the straight lies the half-plane corresponding to the inner part of the circle, and on the other --- suitable appearance. It is clear that there will always be such a line that divides a set of $2n$ points into two halves by $n$ points, and passes through the point $O$ (for example, this direct you can get by turning the whole picture at any angle, no matter what of these $2n+1$ points do not match the coordinates $x$, and then taking a vertical line between the $n$-th and $n+1$-th points). This straight line corresponds to the desired circumference passing through the point $O$, and so the assertion is proved.


\h3{ Application for solving problems of computational geometry }

The remarkable property of geometric inversion --- that in many cases it allows to simplify the set of geometric task, replacing the consideration of circles only the consideration of direct.

I.e. if the task is quite complicated with the circles, it makes sense to apply to the input data, the transformation of inversion, try to solve the obtained modified circles problem without (or with fewer), and then re-apply the inversion to obtain the solution of the original problem.

An example of such tasks are described in the next section.


\h3{ Chain Steiner }

Given two circles $C$ and $D$, one is strictly inside the other. Then draw a third circle $E$ on these two circles, and then starts an iterative process: each time a new circle is drawn so that it \bf{touched} of the previous drawn, and the first two. Sooner or later another drawn circle will intersect with some already delivered, or at least touch it.

Case intersect:

\img{inversion_8.png}

Case touch:

\img{inversion_7.png}

Accordingly, our task is to put \bf{more} of the circle so that the intersection (i.e. the first of the cases) was not. The first two circles (external and internal) are fixed, we can only vary the first position on the circumference, then all circles are put on definitely.

In the case of touch receiving the chain of circles is called a \bf{chain Steiner}.

This chain is associated with so-called \bf{approval Steiner} (Steiner''s porism): if there exists at least one Steiner chain (i.e., there is a corresponding position on the starting circle, causing the chain Steiner), any other choice of starting on the circle will also be a Steiner chain, and the number of circles it will be the same.

From this statement follows that for solving the problem of maximization of the number of circles the answer does not depend on the position of the first set of circles.

\bf{Proof} and a constructive algorithm to solve the following. Note that the problem has a very simple solution in the case when the centers of the outer and inner circles match. It is clear that in this case the number of circles does not depend on the first set. In this case, all circles have the same radius, and their number and the coordinates of the centers can be calculated by simple formulas.

To get to this simple situation of any applied to the input, we apply the inversion transformation with respect to some circle. We want the center of the inner circle shifted and coincided with the center of the outer, so to find the point to which we will take the inverse, we need only the straight line connecting the centers of circles. Using the formulas for the coordinates of the center of the circle after applying the inversion, we can formulate an equation for the position of the centre of inversion, and solve this equation. Thus, we arbitrary situation can move to a simple, symmetric case and, having solved the task, re-apply the transform inversion and obtain the solution of the original problem.


\h3{ used in engineering: Pramila Lipkin-Pozele }

For a long time the task of converting a circular (rotational) motion into a rectilinear remained very difficult in engineering, was able to find at best approximate solutions. And only in 1864 officer of the engineering corps of the French army Charles Nicolas on Poele (Charles-Nicolas Peaucellier) and in 1868 a student of Chebyshev, Lipman Lipkin (Lipkin Lipman) invented this device, based on the idea of geometric inversion. The device is called a \bf{"Pramila Lipkin-Poele"} (Peaucellier–Lipkin linkage).

\img{inversion_10.gif}

To understand the operation of the device, we will note a few points:

\img{inversion_11.png}

Point $B$ rotates around the circumference (red color), resulting in a point $D$ moves in a straight line (blue color). Our task is to prove that the point $D$ --- the essence of inversion of the point $B$ relative to the center $O$ with some radius $r$.

Let's formalize the problem statement: what is the point $O$ is rigidly secured, line segments $OA$ and $OC$ are the same, and also the same four line segments $AB$, $BC$, $CD$, $DA$. Point $B$ moves along the circle passing through the point $O$.

For \bf{proof} note first that the points $O$, $B$ and $D$ are collinear (this follows from the equality of the triangles). Denote by $P$ the point of intersection of the segments $AC$ and $BD$. We introduce the notation:

$$ OB=x,~~~BP=y,~~~AP=h. $$

We need to show that the value $OB \cdot OD = {\rm const}$:

$$ OB \cdot OD = x(x+2y) = x^2 + 2xy. $$

By the Pythagorean theorem we get:

$$ OA^2 = (x+y)^2 + h^2, $$
$$ AD^2 = y^2 + h^2. $$

Take the difference of these two values:

$$ OA^2 - AD^2 = x^2 + 2xy = OB \cdot OD. $$

Thus, we have proved that $OB \cdot OD = {\rm const}$, that means $D$ --- inversion of the point $B$.

