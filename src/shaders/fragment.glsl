precision mediump float;
varying vec3 v_position;
varying vec2 vUv;
varying float v_a_modulus;
uniform vec3 u_color;
uniform float u_colortime;
uniform vec2 u_cursorcolor;

void main(){
    vec3 mixing=mix(vec3(0.,0.,1.),vec3(0.,1.,0.),vUv.x);
    gl_FragColor=vec4(mixing,1.).rgba;
    
    // gl_FragColor.r=1.+sin(u_colortime);
    // gl_FragColor.g=cos(u_colortime);
    // gl_FragColor.b=-sin(u_colortime);
}
