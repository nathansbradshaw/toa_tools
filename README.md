# Tombs of Amascut Lights out puzzle solver
A simple phaserJS app to help solve the Kephri path puzzle for Tombs of Amascuts.


### The equation
<p align="center">
    <img src=img/initial.jpg>
</p>
I am not much of a math person, and so I will try my best to explain what is going on here. 

The first thing I had to do was set up the problem in a matrix. Column 0 corresponds to what happens when you click on the 1st tile. 

[1st, 2nd, 3rd]
[4th,    , 5th]
[6th, 7th, 8th]

To make the programming a little easier I opted to change the numbers of the tiles to:

[0, 1, 2]
[3,  , 4]
[5, 6, 7]

To further ease the problem I put all the values in 1 array: [0, 1, 2, 3, 4, 5, 6, 7]

When solving for the solution it is places into a matrix in a similar for as the array above, but each column (and row) is layed out in relation to what happens when you click on a specific tile.

For example when you click on the first tile (Which I have labeled tile 0 to confuse all non-programmers)

The resulting array labeled T(i,j) for linear algebra nerds is 
[1,1,0,1,0,0,0] 

clicking on the second tile results in an array of [1,1,1,0,0,0,0]
and so on and so forth. See the above picture for the complete matrix of all.

Using these values we can preform row reduction to get the solution.

Each row needs to be reduced to only have a one in their respectice columns. for example: Row 0 should look like [1,0,0,0,0,0,0,0], row 2 should be [0,1,0,0,0,0,0,0] and so forth.

## Solving for the values
<p align="center">
    <img src=img/math.jpg>
</p>


# The solution
Once all the values are solved we can take the operations we used to get the solutions to find which tiles need to be pressed to solve the equation.
<p align="center">
    <img src=img/solution.jpg>
</p>

I better resource to understanding what I did to solve this issue can be found here https://www.youtube.com/watch?v=tGDbmo4N4ig


# Other credit
I got the idea to create this lights out solver from fellow 'scaper andrew-s28, although the way we created our solvers are very different. The resources he provided allowed me to better understand the problem. 
You can see his solution here: https://github.com/andrew-s28/toa_puzzle_solver