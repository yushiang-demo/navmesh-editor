var gt=Object.defineProperty;var mt=(a,t,e)=>t in a?gt(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var S=(a,t,e)=>mt(a,typeof t!="symbol"?t+"":t,e);import{j as B}from"./jsx-runtime-DEdD30eg.js";import{u as k,W as Rt,B as Q,b as at,V as D,Q as yt,c as T,d as pt,e as N,a as z,S as Et,M as it,O as vt,f as ot,g as lt,U as Tt,h as G,i as H,L as Mt,j as At,C as ut,k as Ct,l as St,R as xt,T as It}from"./index-ou0x27U9.js";import{r as C}from"./index-RYns6xqu.js";import{_ as Dt}from"./iframe-BuDW3IQy.js";import"../sb-preview/runtime.js";const bt=()=>{const{renderer:a}=k(),[t]=C.useState(new Rt(512,512));return{render:(n,s)=>{a.setRenderTarget(t),a.render(n,s),a.setRenderTarget(null)},texture:t.texture}};let Pt=class extends Q{constructor(){super();S(this,"thickness",0);S(this,"planeArray",[]);S(this,"floorVertices",[])}_updateGeometry(){const e=this.planeArray.flatMap(([n,s])=>{var R;const i=new at().lookAt(new D(n[0],0,n[2]),new D(s[0],0,s[2]),new D(0,1,0)),l=new yt().setFromRotationMatrix(i),o=new T(s[0]-n[0],s[2]-n[2]).length(),c=s[1]-n[1],u=new pt(this.thickness,c,o);u.applyQuaternion(l),u.translate((s[0]+n[0])/2,(s[1]+n[1])/2,(s[2]+n[2])/2);const h=[...u.attributes.position.array];return[...((R=u.getIndex())==null?void 0:R.array)||[]].flatMap(p=>[h[p*3],h[p*3+1],h[p*3+2]])});this.setAttribute("position",new N(new Float32Array([...this.floorVertices.flat(),...e]),3)),this.computeVertexNormals()}setFloor(e,n){const s=[[1,0,1],[1,0,-1],[-1,0,1],[1,0,-1],[-1,0,-1],[-1,0,1]].flatMap(([i,l,o])=>[i*e/2,l,o*n/2]);this.floorVertices=s,this._updateGeometry()}setPlane(e){e&&(this.planeArray=e,this._updateGeometry())}setThickness(e){this.thickness=e,this._updateGeometry()}};const ct=({width:a,length:t,walls:e,wallThickness:n})=>{const[s]=C.useState(new Pt);return C.useEffect(()=>{s.setFloor(a,t)},[a,t]),C.useEffect(()=>{s.setPlane(e)},[e]),C.useEffect(()=>{s.setThickness(n)},[n]),s},Lt=`
varying vec3 vPos;

void main() {
  vPos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,Ot=`
uniform sampler2D map;
uniform vec2 resolution;
varying vec3 vPos;

void main() {
  vec2 vUv = vec2(vPos.x / resolution.x + 0.5, -vPos.z / resolution.y + 0.5);
  float texelSize = 1.0 / 512.0;

  float center = texture2D(map, vUv).r;
  float left = texture2D(map, vUv + vec2(-texelSize, 0.0)).r;
  float right = texture2D(map, vUv + vec2(texelSize, 0.0)).r;
  float top = texture2D(map, vUv + vec2(0.0, texelSize)).r;
  float bottom = texture2D(map, vUv + vec2(0.0, -texelSize)).r;

  bool isEdge = (center > 0.0) && (abs(center - left) + abs(center - right) + abs(center - top) + abs(center - bottom) > 0.0);

  vec3 color = vec3(1.0);

  if (isEdge) {
    color = vec3(0.8);
  }

  gl_FragColor = vec4(color, 1.0);
}
`;class Ut extends ot{constructor(t,e){super({uniforms:{map:{value:t},resolution:{value:e}},vertexShader:Lt,fragmentShader:Ot})}}const Nt=({wallConfig:a,walls:t})=>{const{scene:e}=k(),n=bt(),s=ct({...a,walls:t});return C.useEffect(()=>{if(!e)return;const{width:i,length:l,wallHeight:o}=a,c=new Ut(n.texture,new T(i,l)),u=new z(s,c);return u.frustumCulled=!1,e.add(u),requestAnimationFrame(()=>{const h=new Et,_=new it({color:"white"}),w=new z(s,_);w.frustumCulled=!1,h.add(w);const R=new vt(-i/2,i/2,l/2,-l/2,0,o);R.position.set(0,o+.001,0),R.lookAt(new D),n.render(h,R)}),()=>{e.remove(u)}},[e,s,a,t]),null},zt=["Recast","Detour","DetourNavMeshBuilder","DetourTileCacheBuilder","NavMeshImporter","NavMeshExporter","CrowdUtils","ChunkyTriMeshUtils","RecastDebugDraw","DetourDebugDraw"],Ft=["rcConfig","rcContext","dtNavMeshParams","dtNavMeshCreateParams","RecastLinearAllocator","RecastFastLZCompressor","rcChunkyTriMesh","dtTileCacheParams","dtTileCacheLayerHeader","Vec3","BoolRef","IntRef","UnsignedIntRef","UnsignedCharRef","UnsignedShortRef","FloatRef","IntArray","UnsignedIntArray","UnsignedCharArray","UnsignedShortArray","FloatArray"],r={isNull:a=>r.Module.getPointer(a)===0,destroy:a=>{r.Module.destroy(a)}},f={},Ht=async a=>{if(r.Module===void 0){{const t=(await Dt(async()=>{const{default:e}=await import("./recast-navigation.wasm-compat-BsXgPnHX.js");return{default:e}},[],import.meta.url)).default;r.Module=await t()}for(const t of zt)r[t]=new r.Module[t];for(const t of Ft)r[t]=r.Module[t];f.RC_BORDER_REG=r.Recast.BORDER_REG,f.RC_MULTIPLE_REGS=r.Recast.MULTIPLE_REGS,f.RC_BORDER_VERTEX=r.Recast.BORDER_VERTEX,f.RC_AREA_BORDER=r.Recast.AREA_BORDER,f.RC_CONTOUR_REG_MASK=r.Recast.CONTOUR_REG_MASK,f.RC_MESH_NULL_IDX=r.Recast.MESH_NULL_IDX,f.RC_NULL_AREA=r.Recast.NULL_AREA,f.RC_WALKABLE_AREA=r.Recast.WALKABLE_AREA,f.RC_NOT_CONNECTED=r.Recast.NOT_CONNECTED,f.RC_CONTOUR_TESS_WALL_EDGES=r.Module.RC_CONTOUR_TESS_WALL_EDGES,f.RC_CONTOUR_TESS_AREA_EDGES=r.Module.RC_CONTOUR_TESS_AREA_EDGES,f.RC_LOG_PROGRESS=r.Module.RC_LOG_PROGRESS,f.RC_LOG_WARNING=r.Module.RC_LOG_WARNING,f.RC_LOG_ERROR=r.Module.RC_LOG_ERROR,f.RC_TIMER_TOTAL=r.Module.RC_TIMER_TOTAL,f.RC_TIMER_TEMP=r.Module.RC_TIMER_TEMP,f.RC_TIMER_RASTERIZE_TRIANGLES=r.Module.RC_TIMER_RASTERIZE_TRIANGLES,f.RC_TIMER_BUILD_COMPACTHEIGHTFIELD=r.Module.RC_TIMER_BUILD_COMPACTHEIGHTFIELD,f.RC_TIMER_BUILD_CONTOURS=r.Module.RC_TIMER_BUILD_CONTOURS,f.RC_TIMER_BUILD_CONTOURS_TRACE=r.Module.RC_TIMER_BUILD_CONTOURS_TRACE,f.RC_TIMER_BUILD_CONTOURS_SIMPLIFY=r.Module.RC_TIMER_BUILD_CONTOURS_SIMPLIFY,f.RC_TIMER_FILTER_BORDER=r.Module.RC_TIMER_FILTER_BORDER,f.RC_TIMER_FILTER_WALKABLE=r.Module.RC_TIMER_FILTER_WALKABLE,f.RC_TIMER_MEDIAN_AREA=r.Module.RC_TIMER_MEDIAN_AREA,f.RC_TIMER_FILTER_LOW_OBSTACLES=r.Module.RC_TIMER_FILTER_LOW_OBSTACLES,f.RC_TIMER_BUILD_POLYMESH=r.Module.RC_TIMER_BUILD_POLYMESH,f.RC_TIMER_MERGE_POLYMESH=r.Module.RC_TIMER_MERGE_POLYMESH,f.RC_TIMER_ERODE_AREA=r.Module.RC_TIMER_ERODE_AREA,f.RC_TIMER_MARK_BOX_AREA=r.Module.RC_TIMER_MARK_BOX_AREA,f.RC_TIMER_MARK_CYLINDER_AREA=r.Module.RC_TIMER_MARK_CYLINDER_AREA,f.RC_TIMER_MARK_CONVEXPOLY_AREA=r.Module.RC_TIMER_MARK_CONVEXPOLY_AREA,f.RC_TIMER_BUILD_DISTANCEFIELD=r.Module.RC_TIMER_BUILD_DISTANCEFIELD,f.RC_TIMER_BUILD_DISTANCEFIELD_DIST=r.Module.RC_TIMER_BUILD_DISTANCEFIELD_DIST,f.RC_TIMER_BUILD_DISTANCEFIELD_BLUR=r.Module.RC_TIMER_BUILD_DISTANCEFIELD_BLUR,f.RC_TIMER_BUILD_REGIONS=r.Module.RC_TIMER_BUILD_REGIONS,f.RC_TIMER_BUILD_REGIONS_WATERSHED=r.Module.RC_TIMER_BUILD_REGIONS_WATERSHED,f.RC_TIMER_BUILD_REGIONS_EXPAND=r.Module.RC_TIMER_BUILD_REGIONS_EXPAND,f.RC_TIMER_BUILD_REGIONS_FLOOD=r.Module.RC_TIMER_BUILD_REGIONS_FLOOD,f.RC_TIMER_BUILD_REGIONS_FILTER=r.Module.RC_TIMER_BUILD_REGIONS_FILTER,f.RC_TIMER_BUILD_LAYERS=r.Module.RC_TIMER_BUILD_LAYERS,f.RC_TIMER_BUILD_POLYMESHDETAIL=r.Module.RC_TIMER_BUILD_POLYMESHDETAIL,f.RC_TIMER_MERGE_POLYMESHDETAIL=r.Module.RC_TIMER_MERGE_POLYMESHDETAIL,f.RC_MAX_TIMERS=r.Module.RC_MAX_TIMERS,r.Detour.FAILURE,r.Detour.SUCCESS,r.Detour.IN_PROGRESS,r.Detour.STATUS_DETAIL_MASK,r.Detour.WRONG_MAGIC,r.Detour.WRONG_VERSION,r.Detour.OUT_OF_MEMORY,r.Detour.INVALID_PARAM,r.Detour.BUFFER_TOO_SMALL,r.Detour.OUT_OF_NODES,r.Detour.PARTIAL_RESULT,r.Detour.ALREADY_OCCUPIED,r.Detour.VERTS_PER_POLYGON,r.Detour.NAVMESH_MAGIC,r.Detour.NAVMESH_VERSION,r.Detour.NAVMESH_STATE_MAGIC,r.Detour.NAVMESH_STATE_VERSION,r.Detour.TILECACHE_MAGIC,r.Detour.TILECACHE_VERSION,r.Detour.TILECACHE_NULL_AREA,r.Detour.TILECACHE_WALKABLE_AREA,r.Detour.TILECACHE_NULL_IDX,r.Detour.NULL_LINK,r.Detour.NULL_LINK,r.Detour.EXT_LINK,r.Detour.OFFMESH_CON_BIDIR,r.Module.DT_STRAIGHTPATH_START,r.Module.DT_STRAIGHTPATH_END,r.Module.DT_STRAIGHTPATH_OFFMESH_CONNECTION,r.Module.DT_STRAIGHTPATH_AREA_CROSSINGS,r.Module.DT_STRAIGHTPATH_ALL_CROSSINGS,r.Module.DT_FINDPATH_ANY_ANGLE,r.Module.DT_RAYCAST_USE_COSTS,r.Module.DT_CROWDAGENT_STATE_INVALID,r.Module.DT_CROWDAGENT_STATE_WALKING,r.Module.DT_CROWDAGENT_STATE_OFFMESH,r.Module.DT_CROWDAGENT_TARGET_NONE,r.Module.DT_CROWDAGENT_TARGET_FAILED,r.Module.DT_CROWDAGENT_TARGET_VALID,r.Module.DT_CROWDAGENT_TARGET_REQUESTING,r.Module.DT_CROWDAGENT_TARGET_WAITING_FOR_QUEUE,r.Module.DT_CROWDAGENT_TARGET_WAITING_FOR_PATH,r.Module.DT_CROWDAGENT_TARGET_VELOCITY,r.Module.DT_COMPRESSEDTILE_FREE_DATA,r.Module.DT_TILE_FREE_DATA}};class W{get size(){return this.raw.size}constructor(t){this.raw=t}get(t){return this.raw.get(t)}set(t,e){this.raw.set(t,e)}resize(t){this.raw.resize(t)}copy(t){this.raw.resize(t.length),this.getHeapView().set(t)}destroy(){r.destroy(this.raw)}getHeapView(){const t=this.getHeap();return new this.typedArrayClass(t.buffer,this.raw.getDataPointer(),this.size)}toTypedArray(){const t=this.getHeapView(),e=new this.typedArrayClass(this.size);return e.set(t),e}}class Bt extends W{constructor(e){super(e??new r.Module.IntArray);S(this,"typedArrayClass",Int32Array)}getHeap(){return r.Module.HEAP32}static fromRaw(e){return new this(e)}}class U extends W{constructor(e){super(e??new r.Module.UnsignedIntArray);S(this,"typedArrayClass",Uint32Array)}getHeap(){return r.Module.HEAPU32}static fromRaw(e){return new this(e)}}class $ extends W{constructor(e){super(e??new r.Module.UnsignedCharArray);S(this,"typedArrayClass",Uint8Array)}getHeap(){return r.Module.HEAPU8}static fromRaw(e){return new this(e)}}class j extends W{constructor(e){super(e??new r.Module.FloatArray);S(this,"typedArrayClass",Float32Array)}getHeap(){return r.Module.HEAPF32}static fromRaw(e){return new this(e)}}const Gt=j,Vt=Bt,kt=$,g={toRaw:({x:a,y:t,z:e},n)=>n?(n.x=a,n.y=t,n.z=e,n):new r.Module.Vec3(a,t,e),fromRaw:a=>{const{x:t,y:e,z:n}=a;return{x:t,y:e,z:n}},fromArray:([a,t,e])=>({x:a,y:t,z:e}),toArray:({x:a,y:t,z:e})=>[a,t,e],lerp:(a,t,e,n={x:0,y:0,z:0})=>{n.x=a.x+(t.x-a.x)*e,n.y=a.y+(t.y-a.y)*e,n.z=a.z+(t.z-a.z)*e},copy:(a,t={x:0,y:0,z:0})=>{t.x=a.x,t.y=a.y,t.z=a.z}},M=(a,t)=>{const e=[];for(let n=0;n<t;n++)e.push(a(n));return e},A=a=>r.Detour.statusSucceed(a);class Wt{constructor(t){this.raw=t}vertBase(){return this.raw.vertBase}triBase(){return this.raw.triBase}vertCount(){return this.raw.vertCount}triCount(){return this.raw.triCount}}class Yt{constructor(t){this.raw=t}ref(){return this.raw.ref}next(){return this.raw.next}edge(){return this.raw.edge}side(){return this.raw.side}bmin(){return this.raw.bmin}bmax(){return this.raw.bmax}}class jt{constructor(t){this.raw=t}bmin(){return g.fromArray(M(t=>this.raw.get_bmin(t),3))}bmax(){return g.fromArray(M(t=>this.raw.get_bmax(t),3))}i(){return this.raw.i}}class dt{constructor(t){this.raw=t}pos(t){return this.raw.get_pos(t)}rad(){return this.raw.rad}poly(){return this.raw.poly}flags(){return this.raw.flags}side(){return this.raw.side}userId(){return this.raw.userId}}class Xt{constructor(t){this.raw=t}magic(){return this.raw.magic}version(){return this.raw.version}x(){return this.raw.x}y(){return this.raw.y}layer(){return this.raw.layer}userId(){return this.raw.userId}polyCount(){return this.raw.polyCount}vertCount(){return this.raw.vertCount}maxLinkCount(){return this.raw.maxLinkCount}detailMeshCount(){return this.raw.detailMeshCount}detailVertCount(){return this.raw.detailVertCount}detailTriCount(){return this.raw.detailTriCount}bvNodeCount(){return this.raw.bvNodeCount}offMeshConCount(){return this.raw.offMeshConCount}offMeshBase(){return this.raw.offMeshBase}walkableHeight(){return this.raw.walkableHeight}walkableRadius(){return this.raw.walkableRadius}walkableClimb(){return this.raw.walkableClimb}bmin(t){return this.raw.get_bmin(t)}bmax(t){return this.raw.get_bmax(t)}bvQuantFactor(){return this.raw.bvQuantFactor}}class X{constructor(t){this.raw=t}firstLink(){return this.raw.firstLink}verts(t){return this.raw.get_verts(t)}neis(t){return this.raw.get_neis(t)}flags(){return this.raw.flags}vertCount(){return this.raw.vertCount}areaAndType(){return this.raw.get_areaAndtype()}getType(){return this.raw.getType()}}class L{constructor(t){this.raw=t}salt(){return this.raw.salt}linksFreeList(){return this.raw.linksFreeList}header(){return r.isNull(this.raw.header)?null:new Xt(this.raw.header)}polys(t){return new X(this.raw.get_polys(t))}verts(t){return this.raw.get_verts(t)}links(t){return new Yt(this.raw.get_links(t))}detailMeshes(t){return new Wt(this.raw.get_detailMeshes(t))}detailVerts(t){return this.raw.get_detailVerts(t)}detailTris(t){return this.raw.get_detailTris(t)}bvTree(t){return new jt(this.raw.get_bvTree(t))}offMeshCons(t){return new dt(this.raw.get_offMeshCons(t))}data(t){return this.raw.get_data(t)}dataSize(){return this.raw.dataSize}flags(){return this.raw.flags}next(){return new L(this.raw.next)}}const Kt=a=>{const t=r.DetourNavMeshBuilder.createNavMeshData(a.raw);return{success:t.success,navMeshData:$.fromRaw(t.navMeshData)}};class Qt{constructor(t){this.raw=t??new r.Module.dtNavMeshCreateParams}setPolyMeshCreateParams(t){r.DetourNavMeshBuilder.setPolyMeshCreateParams(this.raw,t.raw)}setPolyMeshDetailCreateParams(t){r.DetourNavMeshBuilder.setPolyMeshDetailCreateParams(this.raw,t.raw)}setOffMeshConnections(t){if(t.length<=0)return;const e=[],n=[],s=[],i=[],l=[],o=[];for(let c=0;c<t.length;c++){const u=t[c];e.push(u.startPosition.x,u.startPosition.y,u.startPosition.z),e.push(u.endPosition.x,u.endPosition.y,u.endPosition.z),n.push(u.radius),s.push(u.bidirectional?1:0),i.push(u.area??0),l.push(u.flags??1),o.push(u.userId??1e3+c)}r.DetourNavMeshBuilder.setOffMeshConnections(this.raw,t.length,e,n,s,i,l,o)}verts(t){return this.raw.get_verts(t)}setVerts(t,e){this.raw.set_verts(t,e)}vertCount(){return this.raw.vertCount}polys(t){return this.raw.get_polys(t)}setPolys(t,e){this.raw.set_polys(t,e)}polyAreas(t){return this.raw.get_polyAreas(t)}setPolyAreas(t,e){this.raw.set_polyAreas(t,e)}polyFlags(t){return this.raw.get_polyFlags(t)}setPolyFlags(t,e){this.raw.set_polyFlags(t,e)}polyCount(){return this.raw.polyCount}nvp(){return this.raw.nvp}setNvp(t){this.raw.nvp=t}detailMeshes(t){return this.raw.get_detailMeshes(t)}setDetailMeshes(t,e){this.raw.set_detailMeshes(t,e)}detailVerts(t){return this.raw.get_detailVerts(t)}setDetailVerts(t,e){this.raw.set_detailVerts(t,e)}detailVertsCount(){return this.raw.detailVertsCount}detailTris(t){return this.raw.get_detailTris(t)}setDetailTris(t,e){this.raw.set_detailTris(t,e)}detailTriCount(){return this.raw.detailTriCount}offMeshConVerts(t){return this.raw.get_offMeshConVerts(t)}offMeshConRad(t){return this.raw.get_offMeshConRad(t)}offMeshConDir(t){return this.raw.get_offMeshConDir(t)}offMeshConAreas(t){return this.raw.get_offMeshConAreas(t)}offMeshConFlags(t){return this.raw.get_offMeshConFlags(t)}offMeshConUserID(t){return this.raw.get_offMeshConUserID(t)}offMeshConCount(){return this.raw.offMeshConCount}userId(){return this.raw.userId}tileX(){return this.raw.tileX}setTileX(t){this.raw.tileX=t}tileY(){return this.raw.tileY}setTileY(t){this.raw.tileY=t}tileLayer(){return this.raw.tileLayer}setTileLayer(t){this.raw.tileLayer=t}boundsMin(){return M(t=>this.raw.get_bmin(t),3)}setBoundsMin(t){this.raw.set_bmin(0,t[0]),this.raw.set_bmin(1,t[1]),this.raw.set_bmin(2,t[2])}boundsMax(){return M(t=>this.raw.get_bmax(t),3)}setBoundsMax(t){this.raw.set_bmax(0,t[0]),this.raw.set_bmax(1,t[1]),this.raw.set_bmax(2,t[2])}walkableHeight(){return this.raw.walkableHeight}setWalkableHeight(t){this.raw.walkableHeight=t}walkableRadius(){return this.raw.walkableRadius}setWalkableRadius(t){this.raw.walkableRadius=t}walkableClimb(){return this.raw.walkableClimb}setWalkableClimb(t){this.raw.walkableClimb=t}cellSize(){return this.raw.cs}setCellSize(t){this.raw.cs=t}cellHeight(){return this.raw.ch}setCellHeight(t){this.raw.ch=t}buildBvTree(){return this.raw.buildBvTree}setBuildBvTree(t){this.raw.buildBvTree=t}}class $t{get includeFlags(){return this.raw.getIncludeFlags()}set includeFlags(t){this.raw.setIncludeFlags(t)}get excludeFlags(){return this.raw.getExcludeFlags()}set excludeFlags(t){this.raw.setExcludeFlags(t)}constructor(t){this.raw=t??new r.Module.dtQueryFilter}getAreaCost(t){return this.raw.getAreaCost(t)}setAreaCost(t,e){return this.raw.setAreaCost(t,e)}}class qt{constructor(t,e){S(this,"defaultQueryHalfExtents",{x:1,y:1,z:1});t instanceof r.Module.NavMeshQuery?this.raw=t:(this.raw=new r.Module.NavMeshQuery,this.raw.init(t.raw,(e==null?void 0:e.maxNodes)??2048)),e!=null&&e.defaultQueryFilter?this.defaultFilter=e.defaultQueryFilter:(this.defaultFilter=new $t,this.defaultFilter.includeFlags=65535,this.defaultFilter.excludeFlags=0)}findNearestPoly(t,e){var h;const n=new r.UnsignedIntRef,s=new r.Vec3,i=new r.BoolRef,l=this.raw.findNearestPoly(g.toArray(t),g.toArray((e==null?void 0:e.halfExtents)??this.defaultQueryHalfExtents),((h=e==null?void 0:e.filter)==null?void 0:h.raw)??this.defaultFilter.raw,n,s,i),o=g.fromRaw(s);r.destroy(s);const c=n.value;r.destroy(n);const u=i.value;return r.destroy(i),{success:A(l),status:l,nearestRef:c,nearestPoint:o,isOverPoly:u}}findPolysAroundCircle(t,e,n,s){const i=(s==null?void 0:s.filter)??this.defaultFilter,l=(s==null?void 0:s.maxPolys)??256,o=new U,c=new U,u=new j;o.resize(l),c.resize(l),u.resize(l);const h=new r.IntRef,_=this.raw.findPolysAroundCircle(t,g.toArray(e),n,i.raw,o.raw,c.raw,u.raw,h,l),w=[...o.getHeapView()];o.destroy();const R=[...c.getHeapView()];c.destroy();const p=[...u.getHeapView()];u.destroy();const E=h.value;return r.destroy(h),{success:A(_),status:_,resultRefs:w,resultParents:R,resultCost:p,resultCount:E}}queryPolygons(t,e,n){const s=(n==null?void 0:n.filter)??this.defaultFilter,i=(n==null?void 0:n.maxPolys)??256,l=new U;l.resize(i);const o=new r.IntRef,c=this.raw.queryPolygons(g.toArray(t),g.toArray(e),s.raw,l.raw,o,i),u=o.value;r.destroy(o);const h=[...l.getHeapView()];return l.destroy(),{success:A(c),status:c,polyRefs:h,polyCount:u}}closestPointOnPoly(t,e){const n=new r.Vec3,s=new r.BoolRef,i=this.raw.closestPointOnPoly(t,g.toArray(e),n,s),l=g.fromRaw(n);r.destroy(n);const o=s.value;return r.destroy(s),{success:A(i),status:i,closestPoint:l,isPointOverPoly:o}}findClosestPoint(t,e){const n=(e==null?void 0:e.filter)??this.defaultFilter,s=(e==null?void 0:e.halfExtents)??this.defaultQueryHalfExtents,i=new r.UnsignedIntRef,l=new r.Vec3,o=new r.BoolRef,c=this.raw.findClosestPoint(g.toArray(t),g.toArray(s),n.raw,i,l,o),u=i.value;r.destroy(i);const h=g.fromRaw(l);r.destroy(l);const _=o.value;return r.destroy(o),{success:A(c),status:c,polyRef:u,point:h,isPointOverPoly:_}}findRandomPointAroundCircle(t,e,n){const s=(n==null?void 0:n.filter)??this.defaultFilter,i=(n==null?void 0:n.halfExtents)??this.defaultQueryHalfExtents;let l;if(n!=null&&n.startRef)l=n.startRef;else{const w=this.findNearestPoly(t,{filter:s,halfExtents:i});if(!w.success)return{success:!1,status:w.status,randomPolyRef:0,randomPoint:{x:0,y:0,z:0}};l=w.nearestRef}const o=new r.UnsignedIntRef,c=new r.Vec3,u=this.raw.findRandomPointAroundCircle(l,g.toArray(t),e,s.raw,o,c),h=o.value;r.destroy(o);const _=g.fromRaw(c);return r.destroy(c),{success:A(u),status:u,randomPolyRef:h,randomPoint:_}}moveAlongSurface(t,e,n,s){var w;const i=(s==null?void 0:s.maxVisitedSize)??256,l=new r.Vec3,o=new U,c=((w=s==null?void 0:s.filter)==null?void 0:w.raw)??this.defaultFilter.raw,u=this.raw.moveAlongSurface(t,g.toArray(e),g.toArray(n),c,l,o.raw,i),h=g.fromRaw(l);r.destroy(l);const _=[...o.getHeapView()];return o.destroy(),{success:A(u),status:u,resultPosition:h,visited:_}}findRandomPoint(t){var o;const e=new r.UnsignedIntRef,n=new r.Vec3,s=this.raw.findRandomPoint(((o=t==null?void 0:t.filter)==null?void 0:o.raw)??this.defaultFilter.raw,e,n),i=e.value;r.destroy(e);const l=g.fromRaw(n);return r.destroy(n),{success:A(s),status:s,randomPolyRef:i,randomPoint:l}}getPolyHeight(t,e){const n=new r.FloatRef,s=this.raw.getPolyHeight(t,g.toArray(e),n),i=n.value;return r.destroy(n),{success:A(s),status:s,height:i}}computePath(t,e,n){const s=(n==null?void 0:n.filter)??this.defaultFilter,i=(n==null?void 0:n.halfExtents)??this.defaultQueryHalfExtents,l=this.findNearestPoly(t,{filter:s,halfExtents:i});if(!l.success)return{success:!1,error:{name:"findNearestPoly for start position failed",status:l.status},path:[]};const o=this.findNearestPoly(e,{filter:s,halfExtents:i});if(!o.success)return{success:!1,error:{name:"findNearestPoly for end position failed",status:o.status},path:[]};const c=l.nearestRef,u=o.nearestRef,h=(n==null?void 0:n.maxPathPolys)??256,_=this.findPath(c,u,t,e,{filter:s,maxPathPolys:h});if(!_.success)return{success:!1,error:{name:"findPath unsuccessful",status:_.status},path:[]};if(_.polys.size<=0)return{success:!1,error:{name:"no polygon path found"},path:[]};const w=_.polys.get(_.polys.size-1);let R={x:e.x,y:e.y,z:e.z};if(w!==u){const v=this.closestPointOnPoly(w,e);if(!v.success)return{success:!1,error:{name:"no closest point on last polygon found",status:v.status},path:[]};R=v.closestPoint}const p=n==null?void 0:n.maxStraightPathPoints,E=this.findStraightPath(t,R,_.polys,{maxStraightPathPoints:p});if(!E.success)return{success:!1,error:{name:"findStraightPath unsuccessful",status:E.status},path:[]};const{straightPath:d,straightPathCount:y}=E,m=[];for(let v=0;v<y;v++)m.push({x:d.get(3*v),y:d.get(3*v+1),z:d.get(3*v+2)});return _.polys.destroy(),E.straightPath.destroy(),E.straightPathFlags.destroy(),E.straightPathRefs.destroy(),{success:!0,path:m}}findPath(t,e,n,s,i){const l=(i==null?void 0:i.filter)??this.defaultFilter,o=(i==null?void 0:i.maxPathPolys)??256,c=new U;c.resize(o);const u=this.raw.findPath(t,e,g.toArray(n),g.toArray(s),l.raw,c.raw,o);return{success:A(u),status:u,polys:c}}findStraightPath(t,e,n,s){const i=(s==null?void 0:s.maxStraightPathPoints)??256,l=(s==null?void 0:s.straightPathOptions)??0;let o;Array.isArray(n)?(o=new U,o.copy(n)):o=n;const c=new j;c.resize(3*i);const u=new $;u.resize(i);const h=new U;h.resize(i);const _=new r.IntRef,w=this.raw.findStraightPath(g.toArray(t),g.toArray(e),o.raw,c.raw,u.raw,h.raw,_,i,l),R=_.value;return r.destroy(_),Array.isArray(n)&&o.destroy(),{success:A(w),status:w,straightPath:c,straightPathFlags:u,straightPathRefs:h,straightPathCount:R}}raycast(t,e,n,s){var _;const i=new r.Module.dtRaycastHit,l=(s==null?void 0:s.raycastOptions)??0,o=(s==null?void 0:s.prevRef)??0,c=((_=s==null?void 0:s.filter)==null?void 0:_.raw)??this.defaultFilter.raw,u=this.raw.raycast(t,g.toArray(e),g.toArray(n),c,l,i,o),h={success:A(u),status:u,t:i.t,hitNormal:g.fromArray(M(w=>i.get_hitNormal(w),3)),hitEdgeIndex:i.hitEdgeIndex,path:M(w=>i.get_path(w),i.pathCount),maxPath:i.maxPath,pathCost:i.pathCost};return r.destroy(i),h}destroy(){this.raw.destroy()}}class Jt{constructor(t){this.raw=t}tiles(t){return new L(this.raw.get_tiles(t))}tileCount(){return this.raw.tileCount}}class Zt{constructor(t){this.raw=t}data(){return M(t=>this.raw.get_data(t),this.raw.dataSize)}dataSize(){return this.raw.dataSize}}class te{constructor(t){this.raw=t}tileX(){return this.raw.tileX}tileY(){return this.raw.tileY}}class ee{constructor(t){this.raw=t}data(){return M(t=>this.raw.get_data(t),this.raw.dataSize)}dataSize(){return this.raw.dataSize}}class re{constructor(t){this.raw=t??new r.Module.NavMesh}initSolo(t){return this.raw.initSolo(t.raw)}initTiled(t){return this.raw.initTiled(t.raw)}addTile(t,e,n){const s=new r.UnsignedIntRef,i=this.raw.addTile(t.raw,e,n,s),l=s.value;return r.destroy(s),{status:i,tileRef:l}}decodePolyId(t){const e=new r.UnsignedIntRef,n=new r.UnsignedIntRef,s=new r.UnsignedIntRef;this.raw.decodePolyId(t,e,n,s);const i=e.value;r.destroy(e);const l=n.value;r.destroy(n);const o=s.value;return r.destroy(s),{tileSalt:i,tileIndex:l,tilePolygonIndex:o}}encodePolyId(t,e,n){return this.raw.encodePolyId(t,e,n)}removeTile(t){return new Zt(this.raw.removeTile(t))}calcTileLoc(t){return new te(this.raw.calcTileLoc(g.toArray(t)))}getTileAt(t,e,n){const s=this.raw.getTileAt(t,e,n);return r.isNull(s)?null:new L(s)}getTilesAt(t,e,n){return new Jt(this.raw.getTilesAt(t,e,n))}getTileRefAt(t,e,n){return this.raw.getTileRefAt(t,e,n)}getTileRef(t){return this.raw.getTileRef(t.raw)}getTileByRef(t){const e=this.raw.getTileByRef(t);return r.isNull(e)?null:new L(e)}getMaxTiles(){return this.raw.getMaxTiles()}getTile(t){return new L(this.raw.getTile(t))}getTileAndPolyByRef(t){const e=this.raw.getTileAndPolyByRef(t),n=new L(e.tile),s=new X(e.poly);return{success:A(e.status),status:e.status,tile:n,poly:s}}getTileAndPolyByRefUnsafe(t){const e=this.raw.getTileAndPolyByRef(t);return{tile:new L(e.tile),poly:new X(e.poly)}}isValidPolyRef(t){return this.raw.isValidPolyRef(t)}getPolyRefBase(t){return this.raw.getPolyRefBase(t.raw)}getOffMeshConnectionPolyEndPoints(t,e){const n=new r.Vec3,s=new r.Vec3,i=this.raw.getOffMeshConnectionPolyEndPoints(t,e,n,s),l=g.fromRaw(n);r.destroy(n);const o=g.fromRaw(s);return r.destroy(s),{success:A(i),status:i,start:l,end:o}}getOffMeshConnectionByRef(t){return new dt(this.raw.getOffMeshConnectionByRef(t))}setPolyFlags(t,e){return this.raw.setPolyFlags(t,e)}getPolyFlags(t){const e=new r.UnsignedShortRef,n=this.raw.getPolyFlags(t,e),s=e.value;return r.destroy(e),{status:n,flags:s}}setPolyArea(t,e){return this.raw.setPolyArea(t,e)}getPolyArea(t){const e=new r.UnsignedCharRef,n=this.raw.getPolyArea(t,e),s=e.value;return r.destroy(e),{status:n,area:s}}getTileStateSize(t){return this.raw.getTileStateSize(t.raw)}storeTileState(t,e){return new ee(this.raw.storeTileState(t.raw,e))}restoreTileState(t,e,n){return this.raw.restoreTileState(t.raw,e,n)}getDebugNavMesh(){const t=[],e=[];let n=0;const s=this.getMaxTiles();for(let i=0;i<s;i++){const l=this.getTile(i),o=l.header();if(!o)continue;const c=o.polyCount();for(let u=0;u<c;++u){const h=l.polys(u);if(h.getType()===1)continue;const _=h.vertCount(),w=l.detailMeshes(u),R=w.triBase(),p=w.triCount();for(let E=0;E<p;++E){const d=4*(R+E);for(let y=0;y<3;++y){if(l.detailTris(d+y)<_){const m=3*h.verts(l.detailTris(d+y));t.push(l.verts(m),l.verts(m+1),l.verts(m+2))}else{const m=3*(w.vertBase()+l.detailTris(d+y)-h.vertCount());t.push(l.detailVerts(m),l.detailVerts(m+1),l.detailVerts(m+2))}e.push(n++)}}}}return[t,e]}destroy(){this.raw.destroy(),r.Module.destroy(this.raw)}}const ht={borderSize:0,tileSize:0,cs:.2,ch:.2,walkableSlopeAngle:60,walkableHeight:2,walkableClimb:2,walkableRadius:.5,maxEdgeLen:12,maxSimplificationError:1.3,minRegionArea:8,mergeRegionArea:20,maxVertsPerPoly:6,detailSampleDist:6,detailSampleMaxError:1},ne=a=>{const t={...ht,...a},e=new r.Module.rcConfig;return e.borderSize=t.borderSize,e.tileSize=t.tileSize,e.cs=t.cs,e.ch=t.ch,e.walkableSlopeAngle=t.walkableSlopeAngle,e.walkableHeight=t.walkableHeight,e.walkableClimb=t.walkableClimb,e.walkableRadius=t.walkableRadius,e.maxEdgeLen=t.maxEdgeLen,e.maxSimplificationError=t.maxSimplificationError,e.minRegionArea=t.minRegionArea,e.mergeRegionArea=t.mergeRegionArea,e.maxVertsPerPoly=t.maxVertsPerPoly,e.detailSampleDist=t.detailSampleDist,e.detailSampleMaxError=t.detailSampleMaxError,e};class se{constructor(t=!0){S(this,"logs",[]);S(this,"startTimes",{});S(this,"accumulatedTimes",{});const e=new r.Module.RecastBuildContextImpl;e.log=(n,s,i)=>{if(!this.raw.logEnabled())return;const l=s,o=new Uint8Array(r.Module.HEAPU8.buffer,l,i),c=new Uint8Array(i);c.set(o);const u=new TextDecoder().decode(c);this.log(n,u)},e.resetLog=()=>{this.resetLog()},e.startTimer=n=>{this.raw.timerEnabled()&&this.startTimer(n)},e.stopTimer=n=>{this.raw.timerEnabled()&&this.stopTimer(n)},e.getAccumulatedTime=n=>this.raw.timerEnabled()?this.getAccumulatedTime(n):-1,e.resetTimers=()=>{this.raw.timerEnabled()&&(this.startTimes={},this.accumulatedTimes={})},this.raw=new r.Module.RecastBuildContext(e),this.raw.enableTimer(t),this.raw.enableLog(t),this.resetTimers()}log(t,e){this.logs.push({category:t,msg:e})}resetLog(){this.logs=[]}startTimer(t){this.startTimes[t]=performance.now()}stopTimer(t){const e=performance.now()-this.startTimes[t];this.accumulatedTimes[t]===-1?this.accumulatedTimes[t]=e:this.accumulatedTimes[t]+=e}getAccumulatedTime(t){return this.accumulatedTimes[t]}resetTimers(){for(let t=0;t<f.RC_MAX_TIMERS;t++)this.startTimes[t]=-1,this.accumulatedTimes[t]=-1}}class F{constructor(t){this.raw=t}smin(){return this.raw.smin}smax(){return this.raw.smax}area(){return this.raw.area}next(){return r.isNull(this.raw.next)?null:new F(this.raw.next)}}class q{constructor(t){this.raw=t}next(){return r.isNull(this.raw.next)?null:new q(this.raw.next)}items(t){return new F(this.raw.get_items(t))}}class ae{constructor(t){this.raw=t}width(){return this.raw.width}height(){return this.raw.height}bmin(){return g.fromArray(M(t=>this.raw.get_bmin(t),3))}bmax(){return g.fromArray(M(t=>this.raw.get_bmax(t),3))}cs(){return this.raw.cs}ch(){return this.raw.ch}spans(t){return new F(this.raw.get_spans(t))}pools(t){return new q(this.raw.get_pools(t))}freelist(t){return new F(this.raw.get_freelist(t))}}let ie=class{constructor(t){this.raw=t}index(){return this.raw.get_index()}count(){return this.raw.get_count()}};class oe{constructor(t){this.raw=t}y(){return this.raw.get_y()}reg(){return this.raw.get_reg()}con(){return this.raw.get_con()}h(){return this.raw.get_h()}}class le{constructor(t){this.raw=t}width(){return this.raw.width}height(){return this.raw.height}spanCount(){return this.raw.spanCount}walkableHeight(){return this.raw.walkableHeight}walkableClimb(){return this.raw.walkableClimb}borderSize(){return this.raw.borderSize}maxDistance(){return this.raw.maxDistance}maxRegions(){return this.raw.maxRegions}bmin(){return g.fromArray(M(t=>this.raw.get_bmin(t),3))}bmax(){return g.fromArray(M(t=>this.raw.get_bmax(t),3))}cs(){return this.raw.cs}ch(){return this.raw.ch}cells(t){return new ie(this.raw.get_cells(t))}spans(t){return new oe(this.raw.get_spans(t))}dist(t){return this.raw.get_dist(t)}areas(t){return this.raw.get_areas(t)}}class ue{constructor(t){this.raw=t}verts(t){return this.raw.get_verts(t)}nverts(){return this.raw.nverts}rverts(t){return this.raw.get_rverts(t)}nrverts(){return this.raw.nrverts}reg(){return this.raw.reg}area(){return this.raw.area}}let ce=class{constructor(t){this.raw=t}conts(t){return new ue(this.raw.get_conts(t))}nconts(){return this.raw.nconts}bmin(){return g.fromArray(M(t=>this.raw.get_bmin(t),3))}bmax(){return g.fromArray(M(t=>this.raw.get_bmax(t),3))}cs(){return this.raw.cs}ch(){return this.raw.ch}width(){return this.raw.width}height(){return this.raw.height}borderSize(){return this.raw.borderSize}maxError(){return this.raw.maxError}};class de{constructor(t){this.raw=t}verts(t){return this.raw.get_verts(t)}polys(t){return this.raw.get_polys(t)}regs(t){return this.raw.get_regs(t)}flags(t){return this.raw.get_flags(t)}setFlags(t,e){this.raw.set_flags(t,e)}areas(t){return this.raw.get_areas(t)}setAreas(t,e){return this.raw.set_areas(t,e)}nverts(){return this.raw.nverts}npolys(){return this.raw.npolys}maxpolys(){return this.raw.maxpolys}nvp(){return this.raw.nvp}bmin(){return g.fromArray(M(t=>this.raw.get_bmin(t),3))}bmax(){return g.fromArray(M(t=>this.raw.get_bmax(t),3))}cs(){return this.raw.cs}ch(){return this.raw.ch}borderSize(){return this.raw.borderSize}maxEdgeError(){return this.raw.maxEdgeError}}let he=class{constructor(t){this.raw=t}meshes(t){return this.raw.get_meshes(t)}verts(t){return this.raw.get_verts(t)}tris(t){return this.raw.get_tris(t)}nmeshes(){return this.raw.nmeshes}nverts(){return this.raw.nverts}ntris(){return this.raw.ntris}};const we=(a,t,e)=>r.Recast.calcGridSize(a,t,e),fe=(a,t,e,n,s,i,l,o)=>r.Recast.createHeightfield(a.raw,t.raw,e,n,s,i,l,o),_e=(a,t,e,n,s,i,l)=>r.Recast.markWalkableTriangles(a.raw,t,e.raw,n,s.raw,i,l.raw),ge=(a,t,e,n,s,i,l,o=1)=>r.Recast.rasterizeTriangles(a.raw,t.raw,e,n.raw,s.raw,i,l.raw,o),me=(a,t,e)=>r.Recast.filterLowHangingWalkableObstacles(a.raw,t,e.raw),Re=(a,t,e,n)=>r.Recast.filterLedgeSpans(a.raw,t,e,n.raw),ye=(a,t,e)=>r.Recast.filterWalkableLowHeightSpans(a.raw,t,e.raw),pe=(a,t,e,n,s)=>r.Recast.buildCompactHeightfield(a.raw,t,e,n.raw,s.raw),Ee=(a,t,e)=>r.Recast.erodeWalkableArea(a.raw,t,e.raw),ve=(a,t)=>r.Recast.buildDistanceField(a.raw,t.raw),Te=(a,t,e,n,s)=>r.Recast.buildRegions(a.raw,t.raw,e,n,s),Me=(a,t,e,n,s,i=f.RC_CONTOUR_TESS_WALL_EDGES)=>r.Recast.buildContours(a.raw,t.raw,e,n,s.raw,i),Ae=(a,t,e,n)=>r.Recast.buildPolyMesh(a.raw,t.raw,e,n.raw),Ce=(a,t,e,n,s,i)=>r.Recast.buildPolyMeshDetail(a.raw,t.raw,e.raw,n,s,i.raw),Se=()=>new ae(r.Recast.allocHeightfield()),Z=a=>r.Recast.freeHeightfield(a.raw),xe=()=>new le(r.Recast.allocCompactHeightfield()),tt=a=>r.Recast.freeCompactHeightfield(a.raw),Ie=()=>new ce(r.Recast.allocContourSet()),et=a=>r.Recast.freeContourSet(a.raw),De=()=>new de(r.Recast.allocPolyMesh()),be=a=>r.Recast.freePolyMesh(a.raw),Pe=()=>new he(r.Recast.allocPolyMeshDetail()),Le=a=>r.Recast.freePolyMeshDetail(a.raw),Oe=(a,t)=>{const e={x:1/0,y:1/0,z:1/0},n={x:-1/0,y:-1/0,z:-1/0};for(let s=0;s<t.length;s++){const i=t[s],l=a[3*i],o=a[3*i+1],c=a[3*i+2];e.x=Math.min(e.x,l),e.y=Math.min(e.y,o),e.z=Math.min(e.z,c),n.x=Math.max(n.x,l),n.y=Math.max(n.y,o),n.z=Math.max(n.z,c)}return{bbMin:g.toArray(e),bbMax:g.toArray(n)}},Ue={...ht},Ne=(a,t,e={},n=!1)=>{if(!r.Module)throw new Error('"init" must be called before using any recast-navigation-js APIs. See: https://github.com/isaac-mason/recast-navigation-js?tab=readme-ov-file#initialization');const s=new se,i={type:"solo",buildContext:s},l=new re,o=P=>(n||(i.heightfield&&(Z(i.heightfield),i.heightfield=void 0),i.compactHeightfield&&(tt(i.compactHeightfield),i.compactHeightfield=void 0),i.contourSet&&(et(i.contourSet),i.contourSet=void 0),i.polyMesh&&(be(i.polyMesh),i.polyMesh=void 0),i.polyMeshDetail&&(Le(i.polyMeshDetail),i.polyMeshDetail=void 0)),l.destroy(),{navMesh:void 0,success:!1,intermediates:i,error:P}),c=a,u=t.length,h=new Gt;h.copy(c);const _=t,w=t.length/3,R=new Vt;R.copy(_);const{bbMin:p,bbMax:E}=Oe(a,t),d=ne({...Ue,...e});d.minRegionArea=d.minRegionArea*d.minRegionArea,d.mergeRegionArea=d.mergeRegionArea*d.mergeRegionArea,d.detailSampleDist=d.detailSampleDist<.9?0:d.cs*d.detailSampleDist,d.detailSampleMaxError=d.ch*d.detailSampleMaxError;const y=we(p,E,d.cs);d.width=y.width,d.height=y.height;const m=Se();if(i.heightfield=m,!fe(s,m,d.width,d.height,p,E,d.cs,d.ch))return o("Could not create heightfield");const v=new kt;if(v.resize(w),_e(s,d.walkableSlopeAngle,h,u,R,w,v),!ge(s,h,u,R,v,w,m,d.walkableClimb))return o("Could not rasterize triangles");v.destroy(),h.destroy(),R.destroy(),me(s,d.walkableClimb,m),Re(s,d.walkableHeight,d.walkableClimb,m),ye(s,d.walkableHeight,m);const x=xe();if(i.compactHeightfield=x,!pe(s,d.walkableHeight,d.walkableClimb,m,x))return o("Failed to build compact data");if(n||(Z(m),i.heightfield=void 0),!Ee(s,d.walkableRadius,x))return o("Failed to erode walkable area");if(!ve(s,x))return o("Failed to build distance field");if(!Te(s,x,d.borderSize,d.minRegionArea,d.mergeRegionArea))return o("Failed to build regions");const O=Ie();if(i.contourSet=O,!Me(s,x,d.maxSimplificationError,d.maxEdgeLen,O,f.RC_CONTOUR_TESS_WALL_EDGES))return o("Failed to create contours");const b=De();if(i.polyMesh=b,!Ae(s,O,d.maxVertsPerPoly,b))return o("Failed to triangulate contours");const Y=Pe();if(i.polyMeshDetail=Y,!Ce(s,b,x,d.detailSampleDist,d.detailSampleMaxError,Y))return o("Failed to build detail mesh");n||(tt(x),i.compactHeightfield=void 0,et(O),i.contourSet=void 0);for(let P=0;P<b.npolys();P++)b.areas(P)==f.RC_WALKABLE_AREA&&b.setAreas(P,0),b.areas(P)==0&&b.setFlags(P,1);const I=new Qt;I.setPolyMeshCreateParams(b),I.setPolyMeshDetailCreateParams(Y),I.setWalkableHeight(d.walkableHeight),I.setWalkableRadius(d.walkableRadius),I.setWalkableClimb(d.walkableClimb),I.setCellSize(d.cs),I.setCellHeight(d.ch),I.setBuildBvTree(!0),e.offMeshConnections&&I.setOffMeshConnections(e.offMeshConnections);const J=Kt(I);if(!J.success)return o("Failed to create Detour navmesh data");const{navMeshData:_t}=J;return l.initSolo(_t)?{success:!0,navMesh:l,intermediates:i}:o("Failed to create Detour navmesh")};new lt;new D;G.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new T(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}},Ct.line={uniforms:Tt.merge([G.common,G.fog,G.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};new H;new D;new D;new H;new H;new H;new D;new at;new Mt;new D;new lt;new At;new H;new ut;class ze extends St{constructor({navMesh:t,navMeshMaterial:e}){super(),this.navMesh=t,this.geometry=new Q,this.navMeshMaterial=e||new it({color:"orange",transparent:!0,opacity:.7,depthWrite:!1}),this.update(),this.mesh=new z(this.geometry,this.navMeshMaterial),this.add(this.mesh)}update(){const[t,e]=this.navMesh.getDebugNavMesh();this.geometry.setAttribute("position",new N(Float32Array.from(t),3)),this.geometry.setIndex(new N(Uint32Array.from(e),1)),this.geometry.computeVertexNormals()}}const Fe=new D,He=a=>{var l;const t=[];for(const o of a){const c=o.geometry.attributes.position;if(!c||c.itemSize!==3)continue;let u=o;if(((l=o.geometry.getIndex())==null?void 0:l.array)===void 0){u=u.clone(),u.geometry=o.geometry.clone();const _=[];for(let w=0;w<c.count;w++)_.push(w);u.geometry.setIndex(_)}t.push(u)}const e=[],n=[],s={};let i=0;for(const o of t){o.updateMatrixWorld();const c=o.geometry.attributes.position.array,u=o.geometry.getIndex().array;for(let h=0;h<u.length;h++){const _=3*u[h],w=Fe.set(c[_],c[_+1],c[_+2]);o.localToWorld(w);const R=`${w.x}_${w.y}_${w.z}`;let p=s[R];p||(s[R]=p=i,e.push(w.x,w.y,w.z),i++),n.push(p)}}return[Float32Array.from(e),Uint32Array.from(n)]},Be=(a,t={},e=!1)=>{const[n,s]=He(a);return Ne(n,s,t,e)},wt=({wallConfig:a,walls:t})=>{const[e,n]=C.useState(!1),[s,i]=C.useState({}),l=ct({...a,walls:t});return C.useEffect(()=>{Ht().then(()=>n(!0))},[]),C.useEffect(()=>{if(!e||!l)return;const{wallThickness:o}=a,{navMesh:c}=Be([new z(l)],{ch:.1,cs:o+.01,walkableHeight:1});if(c){const u=new ze({navMesh:c});i({navMesh:c,navMeshHelper:u})}return()=>{c==null||c.destroy()}},[l,e,a,t]),s},Ge=({wallConfig:a,walls:t})=>{const{scene:e}=k(),{navMeshHelper:n}=wt({wallConfig:a,walls:t});return C.useEffect(()=>{if(n)return e.add(n),()=>{e.remove(n)}},[n]),null},Ve=`
attribute vec3 color;
varying vec3 vColor;
varying vec2 vUv;

void main() {
  vColor = color;
  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

`,ke=`
varying vec3 vColor;
varying vec2 vUv;

bool isUvBackground(vec2 uv) {
  vec2 coord = (uv * 2.0 - 1.0) * 1.5;
  if (coord.x > 0.0) {
    if (abs(coord.x) + abs(coord.y) > 1.0) {
      return true;
    }
  } else {
    if (abs(coord.y) > 0.25) {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      return true;
    }
  }
}

void main() {
  vec2 uv = vec2(mod(vUv.x, 1.0), vUv.y);

  if (!isUvBackground(uv) && mod(vUv.x,2.0)<1.0) {
    gl_FragColor = vec4(vColor, 1.0);
    return;
  }

  gl_FragColor = vec4(0.0,0.0,0.0, 0.2);
}
`;class We extends z{constructor(){const t=new Q,e=new ot({vertexShader:Ve,fragmentShader:ke});super(),this.geometry=t,this.material=e,this.position.set(0,.1,0),this.frustumCulled=!1}computeJointDirection(t,e,n){if(!t){const o=new T(n.x-e.x,n.z-e.z);return new T(-o.y,o.x).normalize()}if(!n){const o=new T(e.x-t.x,e.z-t.z);return new T(-o.y,o.x).normalize()}const s=new T(e.x-t.x,e.z-t.z).normalize(),i=new T(n.x-e.x,n.z-e.z).normalize(),l=new T().addVectors(s,i).normalize();return new T(-l.y,l.x).normalize()}updateTrace(t){const e=[],n=[],s=[],i=[];let l=0;for(let o=0;o<t.length;o++){const u=t[o-1],h=t[o],_=t[o+1],w=this.computeJointDirection(u,h,_).multiplyScalar(.5/2),R=new T(h.x,h.z),p=new T().addVectors(R,w),E=new T().subVectors(R,w);n.push(p.x,.1,p.y,E.x,.1,E.y),o>0&&(l+=new T(h.x-u.x,h.z-u.z).length()/.5),s.push(l,0,l,1);const d=new ut().setHSL(R.length()/10,1,.5).toArray();if(i.push(...d,...d),o>0){const y=(o-1)*2;e.push(y+0,y+2,y+1,y+2,y+3,y+1)}}this.geometry.setIndex(e),this.geometry.setAttribute("position",new N(new Float32Array(n),3)),this.geometry.setAttribute("uv",new N(new Float32Array(s),2)),this.geometry.setAttribute("color",new N(new Float32Array(i),3))}}const Ye=({wallConfig:a,walls:t})=>{const e=C.useRef(new We),{scene:n,renderer:s,camera:i,controls:l}=k(),{navMesh:o,navMeshHelper:c}=wt({wallConfig:a,walls:t});return C.useEffect(()=>{if(n)return n.add(e.current),()=>{n.remove(e.current)}},[n]),C.useEffect(()=>{if(!s||!c||!o)return;const u=new qt(o),h=new xt;let _=null;const w=(y,m)=>{const v=new T(y,m);h.setFromCamera(v,i);const O=h.intersectObjects([c])[0];return O?O.point:null},R=(y,m)=>{const{point:v}=u.findClosestPoint({x:y.x,y:y.y,z:y.z}),{point:x}=u.findClosestPoint({x:m.x,y:m.y,z:m.z});return u.computePath(v,x)},p=y=>{const m=w(y.clientX/window.innerWidth*2-1,-(y.clientY/window.innerHeight)*2+1);m&&(l.enabled=!1,_=m)},E=y=>{const m=w(y.clientX/window.innerWidth*2-1,-(y.clientY/window.innerHeight)*2+1);if(_&&m){const{path:v}=R(_,m);e.current.updateTrace(v)}},d=()=>{l.enabled=!0,_=null};return s.domElement.addEventListener("pointerdown",p),s.domElement.addEventListener("pointermove",E),s.domElement.addEventListener("pointerup",d),()=>{s.domElement.removeEventListener("pointerdown",p),s.domElement.removeEventListener("pointermove",E),s.domElement.removeEventListener("pointerup",d)}},[s,o]),null},K=({wallConfig:a,walls:t})=>B.jsxs(It,{children:[B.jsx(Nt,{wallConfig:a,walls:t}),B.jsx(Ge,{wallConfig:a,walls:t}),B.jsx(Ye,{wallConfig:a,walls:t})]});try{K.displayName="Viewer",K.__docgenInfo={description:"",displayName:"Viewer",props:{wallConfig:{defaultValue:null,description:"",name:"wallConfig",required:!0,type:{name:"WallConfig"}},walls:{defaultValue:null,description:"",name:"walls",required:!0,type:{name:"Walls"}}}}}catch{}const ft={wallThickness:.4,width:20,length:20,wallHeight:1},je=[[[1,-9.75],[1,1.2]],[[-4.6,1.2],[1.02,1.2]],[[-9.55,1.2],[-7.1,1.2]],[[4,-9.75],[4,-4]],[[4,-.6],[4,.75]],[[4,.55],[8.34,.55]],[[-9.65,8.5],[-6.8,8.5]],[[-3.75,8.5],[2.5,8.5]],[[5.55,8.5],[8.34,8.5]],[[-9.9,-9.75],[1.2,-9.75]],[[3.8,-9.75],[8.7,-9.75]],[[-9.7,-9.75],[-9.7,8.7]],[[8.5,-9.75],[8.5,8.7]]].map(([a,t])=>[[a[0],0,a[1]],[t[0],ft.wallHeight,t[1]]]),nr={title:"Viewer",component:K},V={args:{wallConfig:ft,walls:je}};var rt,nt,st;V.parameters={...V.parameters,docs:{...(rt=V.parameters)==null?void 0:rt.docs,source:{originalSource:`{
  args: {
    wallConfig,
    walls
  }
}`,...(st=(nt=V.parameters)==null?void 0:nt.docs)==null?void 0:st.source}}};const sr=["Playground"];export{V as Playground,sr as __namedExportsOrder,nr as default};
