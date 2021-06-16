class Rope{
    constructor(bodyA, point){
        var options ={
            bodyA: bodyA,
            pointB: point,
            stiffness: 0.03,
            length: 75,
            
        }

    this.rope =Constraint.create(options);
    World.add(world, this.rope);

    this.bodyA = bodyA;
    this.point = point;
    }
    display(){
        stroke(10);
        line(this.bodyA.position.x, this.bodyA.position.y, this.point.x, this.point.y)
    }

    fly(){
        this.rope.bodyA = null;
    }
}