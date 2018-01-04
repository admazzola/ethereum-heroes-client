
let localPlayer = {}

  spawnPlayer(localPlayer)

  var socket = io('http://localhost:3000');
  socket.on('connect', function (data) {
    console.log(data);
    socket.emit('event', { player: localPlayer });
  });


  socket.on('loadAsset', function (data) {
    console.log('loading asset');
    console.log(data);

    loadAsset(data)

  });

  socket.on('spawnEntity', function (data) {
    console.log('spawning entity');
    console.log(data);

    spawnEntity(data)

  });



  function spawnPlayer(p)
  {
    console.log('spawning player')

    var spawnLoc = getSpawnLoc();
    p.x = spawnLoc.x;
    p.y = spawnLoc.y;
  }


  function getSpawnLoc()
  {
    return {x: 5.0, y: 5.0}
  }

  function loadAsset(data)
  {


    var sceneEl = document.querySelector('a-scene');
    var assetEl = document.createElement('a-asset');

    assetEl.setAttribute('id',data.id)
    assetEl.setAttribute('src',data.src)

      sceneEl.appendChild(assetEl);
  }


  //https://aframe.io/docs/0.5.0/introduction/javascript-events-dom-apis.html
  function spawnEntity(data)
  {
    var sceneEl = document.querySelector('a-scene');
    var entityEl = document.createElement('a-entity');




    // Do `.setAttribute()`s to initialize the entity.
    entityEl.setAttribute('id',data.entity_id)
    entityEl.setAttribute('gltf-model',data.modelSelector)
  //  entityEl.setAttribute('material',data.material)
    entityEl.setAttribute('position',data.position)
    entityEl.setAttribute('rotation',data.rotation)


    sceneEl.appendChild(entityEl);
  }
