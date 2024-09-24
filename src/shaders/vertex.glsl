uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

attribute vec3 position;
attribute vec2 uv;
attribute float a_modulus;

varying vec3 v_position;
varying vec2 vUv;
varying float v_a_modulus;

uniform float u_amplitude;
uniform float u_time;
uniform vec2 u_cursorcolor;

void main(){
   // vec3 copyPosition=position;
   // copyPosition.y+=copyPosition.y;
   v_position=position;
   vUv=uv;
   v_a_modulus=a_modulus;
   
   vec4 modelPosition=modelMatrix*vec4(position,1.);
   
   // modelPosition.z+=sin(modelPosition.x*u_amplitude+u_time)*.15;
   // modelPosition.y+=sin(modelPosition.x*u_amplitude+u_time)*.15;
   modelPosition.z+=distance(uv,u_cursorcolor);
   
   vec4 viewPosition=viewMatrix*modelPosition;
   vec4 projectionPosition=projectionMatrix*viewPosition;
   
   gl_Position=projectionPosition;
}
