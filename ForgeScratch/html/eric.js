goog.require('Blockly.Blocks');



//Blockly.Blocks.colour.HUE = 20;

/*

Blockly.Blocks['name'] = {
  
  init: function() {
    this.jsonInit({
      
    });
  }
};



Blockly.Java['name'] = function(block) {
  var value_item = Blockly.Java.valueToCode(block, 'ITEM', Blockly.Java.ORDER_ATOMIC);
  var code = '...;\n';
  return code;
};

*/

function showError(block, msg){
  var nice = msg.replace("FS ", "");
  block.setWarningText(nice);
  throw("FS " + msg); //code.js will catch this and forward msg on to Java
};


Blockly.Blocks['mcblock'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblock",
  "message0": "Minecraft Block %1 Name: %2 %3 Properties: %4 %5 Options %6 %7",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "NAME",
      "text": "change_me"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "MATERIAL",
      "options": [
        [
          "Dirt",
          "Material.ground"
        ],
        [
          "Stone",
          "Material.rock"
        ],
        [
          "Wood",
          "Material.wood"
        ],
        [
          "Glass",
          "Material.glass"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "Options",
      "check": "mcblockoptions"
    }
  ],
  "inputsInline": false,
  "colour": 315,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

function isJavaId(c)
{
  return c.match(/[a-zA-Z0-9]/i);
}

function make_java_id(name)
{
  var result = "";
  for (var i = 0; i < name.length; ++i) {
    var c = name.charAt(i);
    if (isJavaId(c)) {
      result = result + c;
    }
    else {
      result = result + "_";
    }
  }

  return result;
}


Blockly.Java['mcblock'] = function(block) {
  var value_name = make_java_id(block.getFieldValue('NAME'));
  var raw_value_name = block.getFieldValue('NAME');
  var dropdown_material = block.getFieldValue('MATERIAL');
  var statements_options = Blockly.Java.statementToCode(block, 'Options');
  var code = 
    '    public class Mcblock_' + value_name + ' extends BlockBase {\n' +
    '        public Mcblock_' + value_name + '() {\n' +
    '            super(BLOCK_ID, CREATIVE_TAB, "' + raw_value_name + '", ' + dropdown_material + '); \n' +
    '        }\n\n' +
          statements_options +
    '    }\n';

  return code;
};

Blockly.Blocks['mcblockoptions_quantity'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions",
  "message0": "Amount: %1",
  "args0": [
    {
      "type": "input_value",
      "name": "AMOUNT",
      "check": "Number"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcblockoptions_quantity'] = function(block) {
  var value_amount = Blockly.Java.valueToCode(block, 'AMOUNT', Blockly.Java.ORDER_ATOMIC);
  var code = 
  '    @Override\n' + 
  '    public int quantityDropped(Random r){\n' +
  '        return Math.max(0,(int)' + value_amount + ');\n' + 
  '    }\n';
  return code;
};



Blockly.Blocks['mcblockoptions_lightopacity'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions",
  "message0": "Light Opacity %1",
  "args0": [
    {
      "type": "input_value",
      "name": "LIGHT_OPACITY",
      "check": "Number"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcblockoptions_lightopacity'] = function(block) {
  var value_light_opacity = Blockly.Java.valueToCode(block, 'LIGHT_OPACITY', Blockly.Java.ORDER_ATOMIC);
  
  var code = 
  '    @Override\n' +
  '    public int getLightOpacity() {\n' +
  '        return Math.min(15, Math.max(0,(int)' + value_light_opacity + '));\n' +
  '    }\n';

  return code;
};



Blockly.Blocks['mcblockoptions_lightvalue'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions",
  "message0": "Light Value %1",
  "args0": [
    {
      "type": "input_value",
      "name": "LIGHT_VALUE",
      "check": "Number"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
    });
  }
}; 

Blockly.Java['mcblockoptions_lightvalue'] = function(block) {
  var value_light_value  = Blockly.Java.valueToCode(block, 'LIGHT_VALUE', Blockly.Java.ORDER_ATOMIC);
  
  var code = 
  '    @Override\n' +
  '    public int getLightValue() {\n' +
  '        return Math.min(15, Math.max(0,(int)' + value_light_value  + '));\n' +
  '    }\n';

  return code;
};


Blockly.Blocks['mcblockoptions_click_right'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions_click_right",
  "message0": "On Right Click %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": "action"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
    });
  }
}; 

Blockly.Java['mcblockoptions_click_right'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '    @Override\n' +
  '    public boolean onBlockActivated(World world, int x, int y, int z, EntityPlayer player, int side, float hx, float hy, float hz) {\n' +
  '        ' + statements_code + '\n' +
  '        return true;\n' +
  '    }\n';
  return code;
};


Blockly.Blocks['mcblockoptions_click_left'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions_click_left",
  "message0": "On Left Click %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": "action"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
    });
  }
}; 

Blockly.Java['mcblockoptions_click_left'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '    @Override\n' +
  '    public void onBlockClicked(World world, int x, int y, int z, EntityPlayer player) {\n' +
  '        ' + statements_code + '\n' +
  '    }\n';
  return code;
};


Blockly.Blocks['mcblockoptions_blockplaced'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions_blockplaced",
  "message0": "On Block Placed %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": "action"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
    });
  }
}; 

Blockly.Java['mcblockoptions_blockplaced'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '    @Override\n' +
  '    public void onBlockPlacedBy(World world, int x, int y, int z, EntityLivingBase player, ItemStack itemstack) {\n' +
  '        ' + statements_code + '\n' +
  '    }\n';
  return code;
};



Blockly.Blocks['mcblockoptions_block_broken_player'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions_block_broken_player",
  "message0": "On Block Mined %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": "action"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
    });
  }
}; 

Blockly.Java['mcblockoptions_block_broken_player'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '    @Override\n' +
  '    public void onBlockHarvested(World world, int x, int y, int z, int meta, EntityPlayer player) {\n' +
  '        ' + statements_code + '\n' +
  '    }\n';
  return code;
};



Blockly.Blocks['mcblockoptions_block_broken_explosion'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions_block_broken_explosion",
  "message0": "On Block Destroyed By Explosion %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "NAME",
      "check": "action"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
    });
  }
}; 

Blockly.Java['mcblockoptions_block_broken_explosion'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '    @Override\n' +
  '    public void onBlockDestroyedByExplosion(World world, int x, int y, int z, Explosion explosion) {\n' +
  '        ' + statements_code + '\n' +
  '    }\n';
  return code;
};



Blockly.Blocks['mcblockoptions_walkthrough'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions",
  "message0": "On Block Walkthough %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcblockoptions_walkthrough'] = function(block) {
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');
  
  var code = 
  '    @Override\n' +
  '    public void onEntityCollidedWithBlock(World world, int x, int y, int z, Entity entity) {\n' +
  '        ' + statements_code + '\n' +
  '    }\n' +
  '\n' +
  '    @Override\n' +
  '    public AxisAlignedBB getCollisionBoundingBoxFromPool(){return null;}\n' +
  '\n' +
  '    @Override\n' +
  '    public boolean renderAsNormalBlock(){return false;}\n'

  ;
  return code;
}; 


Blockly.Blocks['mcblockoptions_transparent'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions",
  "message0": "Render Block Like Glass",
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
    });
  }
}; 

Blockly.Java['mcblockoptions_transparent'] = function(block) {
  var code = 
  '    @Override\n' +
  '    public boolean isOpaqueCube(){return false;}\n';
  return code;
};



Blockly.Blocks['mcblockoptions_experience'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcblockoptions",
  "message0": "Amount Of XP To Drop %1",
  "args0": [
    {
      "type": "input_value",
      "name": "AMOUNT",
      "check": "Number"
    }
  ],
  "previousStatement": "mcblockoptions",
  "nextStatement": "mcblockoptions",
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
    });
  }
}; 

Blockly.Java['mcblockoptions_experience'] = function(block) {
  var value_light_value  = Blockly.Java.valueToCode(block, 'AMOUNT', Blockly.Java.ORDER_ATOMIC);
  
  var code = 
  '    @Override\n' +
  '    public int getExpDrop() {\n' +
  '        return Math.max(0,(int)' + value_light_value  + ');\n' +
  '    }\n';

  return code;
};


Blockly.Blocks['mcaction_time_selector'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_time_selector",
  "message0": "Set time to %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "time",
      "options": [
        [
          "Sunrise",
          "0"
        ],
        [
          "Day",
          "1000"
        ],
        [
          "Afternoon",
          "6000"
        ],
        [
          "Sunset",
          "12000"
        ],
        [
          "Night",
          "13000"
        ],
        [
          "Midnight",
          "18000"
        ]
      ]
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": 140,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_time_selector'] = function(block) {
  var dropdown_time = block.getFieldValue('time');
  
  var code = 'world.setWorldTime(Math.max(0, (long)' + dropdown_time + '));';

  return code;
};


Blockly.Blocks['mcaction_time_raw'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_time_raw",
  "message0": "Set time to %1",
  "args0": [
    {
      "type": "input_value",
      "name": "time",
      "check": "Number"
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": 140,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_time_raw'] = function(block) {
  var value_time = Blockly.Java.valueToCode(block, 'time', Blockly.Java.ORDER_ATOMIC);
  
  var code = 'world.setWorldTime(Math.max(0, (long)' + value_time + '));';

  return code;
};



Blockly.Blocks['mcaction_spawn_mob'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_spawn_mob",
  "message0": "Spawn Mob %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "MOB",
      "options": [
        [
          "Creeper",
          "Creeper"
        ],
        [
          "Skeleton",
          "Skeleton"
        ],
        [
          "Spider",
          "Spider"
        ],
        [
          "Giant",
          "Giant"
        ],
        [
          "Zombie",
          "Zombie"
        ],
        [
          "Slime",
          "Slime"
        ],
        [
          "Ghast",
          "Ghast"
        ],
        [
          "Zombie Pigman",
          "PigZombie"
        ],
        [
          "Enderman",
          "Enderman"
        ],
        [
          "Cave Spider",
          "CaveSpider"
        ],
        [
          "Silverfish",
          "Silverfish"
        ],
        [
          "Blaze",
          "Blaze"
        ],
        [
          " Lava Slime",
          "LavaSlime"
        ],
        [
          "Ender Dragon",
          "EnderDragon"
        ],
        [
          " Wither",
          "WitherBoss"
        ],
        [
          "Bat",
          "Bat"
        ],
        [
          "Pig",
          "Pig"
        ],
        [
          "Sheep",
          "Sheep"
        ],
        [
          "Cow",
          "Cow"
        ],
        [
          "Chicken",
          "Chicken"
        ],
        [
          "Squid",
          "Squid"
        ],
        [
          "Wolf",
          "Wolf"
        ],
        [
          "Mooshroom",
          "Mooshroom"
        ],
        [
          " Snow Man",
          "SnowMan"
        ],
        [
          "Cat",
          "Ozelot"
        ],
        [
          "Iron Golem",
          "VillagerGolem"
        ],
        [
          "Horse",
          "EntityHorse"
        ],
        [
          "Villager",
          "Villager"
        ]
      ]
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": 140,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_spawn_mob'] = function(block) {
  var dropdown_mob = block.getFieldValue('MOB');

  var code = 'ModHelpers.spawnEntityInWorld(world, x, y, z, "' + dropdown_mob + '");\n';
  return code;
};

Blockly.Blocks['mcaction_explosion'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_explosion",
  "message0": "Explosion %1 Power %2 Smoke %3 %4 Fire %5",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "POWER",
      "check": "Number"
    },
    {
      "type": "field_checkbox",
      "name": "SMOKE",
      "checked": true
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "FIRE",
      "checked": false
    }
  ],
  "inputsInline": false,
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": 140,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};


Blockly.Java['mcaction_explosion'] = function(block) {
  var value_power = Blockly.Java.valueToCode(block, 'POWER', Blockly.Java.ORDER_ATOMIC);
  var checkbox_smoke = block.getFieldValue('SMOKE') == 'TRUE';
  var checkbox_fire = block.getFieldValue('FIRE') == 'TRUE';

  var code = 'world.newExplosion((Entity)null, x, y, z, ' + (value_power + 1) + ', ' + checkbox_fire + ', ' + checkbox_smoke + ');\n';
  return code;
};

Blockly.Blocks['mcaction_potion'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_potion",
  "message0": "Add Potion Effect To Player %1 Potion:  %2 %3 Seconds %4 Amplifier %5 Make Particles Invisible %6",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "POTION",
      "options": [
        [
          "Speed",
          "1"
        ],
        [
          "Slowness",
          "2"
        ],
        [
          "Haste",
          "3"
        ],
        [
          "Mining Fatigue",
          "4"
        ],
        [
          "Strength",
          "5"
        ],
        [
          "Instant Health",
          "6"
        ],
        [
          "Instant Damage",
          "7"
        ],
        [
          "Jump Boost",
          "8"
        ],
        [
          "Nausea",
          "9"
        ],
        [
          "Regeneration",
          "10"
        ],
        [
          "Resistance",
          "11"
        ],
        [
          "Fire Resistance",
          "12"
        ],
        [
          "Water Breathing",
          "13"
        ],
        [
          "Invisibility",
          "14"
        ],
        [
          "Blindness",
          "15"
        ],
        [
          "Night Vision",
          "16"
        ],
        [
          "Hunger",
          "17"
        ],
        [
          "Weakness",
          "18"
        ],
        [
          "Poison",
          "19"
        ],
        [
          "Wither",
          "20"
        ],
        [
          "Health Boost",
          "21"
        ],
        [
          "Absorption",
          "22"
        ],
        [
          "Saturation",
          "23"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "TIME",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "AMP",
      "check": "Number"
    },
    {
      "type": "field_checkbox",
      "name": "INVIS",
      "checked": true
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": 140,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_potion'] = function(block) {
  var dropdown_potion = block.getFieldValue('POTION');
  var value_time = Blockly.Java.valueToCode(block, 'TIME', Blockly.Java.ORDER_ATOMIC);
  var value_amp = Blockly.Java.valueToCode(block, 'AMP', Blockly.Java.ORDER_ATOMIC);
  var checkbox_invis = block.getFieldValue('INVIS') == 'TRUE';

  var code = 'ModHelpers.addPotionToPlayer(player, ' + dropdown_potion + ', ' + value_time +', ' + value_amp +', ' + checkbox_invis +');\n';
  return code;
};



Blockly.Blocks['mcaction_playsound'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_playsound",
  "message0": "Play Sound:  %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "SOUND",
      "options": [
        ["ambient.cave", "ambient.cave"], 
        ["ambient.weather.rain", "ambient.weather.rain"], 
        ["ambient.weather.thunder", "ambient.weather.thunder"],
        ["damage.fallbig", "damage.fallbig"],
        ["damage.fallsmall", "damage.fallsmall"],
        ["damage.hit", "damage.hit"],
        ["dig.cloth", "dig.cloth"],
        ["dig.grass", "dig.grass"],
        ["dig.gravel", "dig.gravel"],
        ["dig.sand", "dig.sand"],
        ["dig.snow", "dig.snow"],
        ["dig.stone", "dig.stone"],
        ["dig.wood", "dig.wood"],
        ["fire.fire", "fire.fire"],
        ["fire.ignite", "fire.ignite"],
        ["fireworks.blast_far1", "fireworks.blast_far1"],
        ["fireworks.blast1", "fireworks.blast1"],
        ["fireworks.largeBlast_far1", "fireworks.largeBlast_far1"],
        ["fireworks.largeBlast1", "fireworks.largeBlast1"],
        ["fireworks.launch1", "fireworks.launch1"],
        ["fireworks.twinkle_far1", "fireworks.twinkle_far1"],
        ["fireworks.twinkle1", "fireworks.twinkle1"],
        ["liquid.lava", "liquid.lava"],
        ["liquid.lavapop", "liquid.lavapop"],
        ["liquid.splash", "liquid.splash"],
        ["liquid.swim", "liquid.swim"],
        ["liquid.water", "liquid.water"],
        ["minecart.base", "minecart.base"],
        ["minecart.inside", "minecart.inside"],
        ["mob.bat.death", "mob.bat.death"],
        ["mob.bat.hurt", "mob.bat.hurt"],
        ["mob.bat.idle", "mob.bat.idle"],
        ["mob.bat.loop", "mob.bat.loop"],
        ["mob.bat.takeoff", "mob.bat.takeoff"],
        ["mob.blaze.breathe", "mob.blaze.breathe"],
        ["mob.blaze.death", "mob.blaze.death"],
        ["mob.blaze.hit", "mob.blaze.hit"],
        ["mob.cat.hiss", "mob.cat.hiss"],
        ["mob.cat.hitt", "mob.cat.hitt"],
        ["mob.cat.meow", "mob.cat.meow"],
        ["mob.cat.purr", "mob.cat.purr"],
        ["mob.cat.purreow", "mob.cat.purreow"],
        ["mob.chicken.hurt", "mob.chicken.hurt"],
        ["mob.chicken.plop", "mob.chicken.plop"],
        ["mob.chicken.say", "mob.chicken.say"],
        ["mob.chicken.step", "mob.chicken.step"],
        ["mob.cow.hurt", "mob.cow.hurt"],
        ["mob.cow.say", "mob.cow.say"],
        ["mob.cow.step", "mob.cow.step"],
        ["mob.creeper.death", "mob.creeper.death"],
        ["mob.creeper.say", "mob.creeper.say"],
        ["mob.enderdragon.end", "mob.enderdragon.end"],
        ["mob.enderdragon.growl", "mob.enderdragon.growl"],
        ["mob.enderdragon.hit", "mob.enderdragon.hit"],
        ["mob.enderdragon.wings", "mob.enderdragon.wings"],
        ["mob.endermen.death", "mob.endermen.death"],
        ["mob.endermen.hit", "mob.endermen.hit"],
        ["mob.endermen.idle", "mob.endermen.idle"],
        ["mob.endermen.portal", "mob.endermen.portal"],
        ["mob.endermen.scream", "mob.endermen.scream"],
        ["mob.endermen.stare", "mob.endermen.stare"],
        ["mob.ghast.affectionate_scream", "mob.ghast.affectionate_scream"],
        ["mob.ghast.charge", "mob.ghast.charge"],
        ["mob.ghast.death", "mob.ghast.death"],
        ["mob.ghast.fireball4", "mob.ghast.fireball4"],
        ["mob.ghast.moan", "mob.ghast.moan"],
        ["mob.ghast.scream", "mob.ghast.scream"],
        ["mob.irongolem.death", "mob.irongolem.death"],
        ["mob.irongolem.hit", "mob.irongolem.hit"],
        ["mob.irongolem.throw", "mob.irongolem.throw"],
        ["mob.irongolem.walk", "mob.irongolem.walk"],
        ["mob.magmacube.big", "mob.magmacube.big"],
        ["mob.magmacube.jump", "mob.magmacube.jump"],
        ["mob.magmacube.small", "mob.magmacube.small"],
        ["mob.pig.death", "mob.pig.death"],
        ["mob.pig.say", "mob.pig.say"],
        ["mob.pig.step", "mob.pig.step"],
        ["mob.sheep.say", "mob.sheep.say"],
        ["mob.sheep.shear", "mob.sheep.shear"],
        ["mob.sheep.step", "mob.sheep.step"],
        ["mob.silverfish.hit", "mob.silverfish.hit"],
        ["mob.silverfish.kill", "mob.silverfish.kill"],
        ["mob.silverfish.say", "mob.silverfish.say"],
        ["mob.silverfish.step", "mob.silverfish.step"],
        ["mob.skeleton.death", "mob.skeleton.death"],
        ["mob.skeleton.hurt", "mob.skeleton.hurt"],
        ["mob.skeleton.say", "mob.skeleton.say"],
        ["mob.skeleton.step", "mob.skeleton.step"],
        ["mob.slime.attack", "mob.slime.attack"],
        ["mob.slime.big", "mob.slime.big"],
        ["mob.slime.small", "mob.slime.small"],
        ["mob.spider.death", "mob.spider.death"],
        ["mob.spider.say", "mob.spider.say"],
        ["mob.spider.step", "mob.spider.step"],
        ["mob.villager.death", "mob.villager.death"],
        ["mob.villager.haggle", "mob.villager.haggle"],
        ["mob.villager.hit", "mob.villager.hit"],
        ["mob.villager.idle", "mob.villager.idle"],
        ["mob.villager.no", "mob.villager.no"],
        ["mob.villager.yes", "mob.villager.yes"],
        ["mob.wither.death", "mob.wither.death"],
        ["mob.wither.hurt", "mob.wither.hurt"],
        ["mob.wither.idle", "mob.wither.idle"],
        ["mob.wither.shoot", "mob.wither.shoot"],
        ["mob.wither.spawn", "mob.wither.spawn"],
        ["mob.wolf.bark", "mob.wolf.bark"],
        ["mob.wolf.death", "mob.wolf.death"],
        ["mob.wolf.growl", "mob.wolf.growl"],
        ["mob.wolf.howl", "mob.wolf.howl"],
        ["mob.wolf.hurt", "mob.wolf.hurt"],
        ["mob.wolf.panting", "mob.wolf.panting"],
        ["mob.wolf.shake", "mob.wolf.shake"],
        ["mob.wolf.step", "mob.wolf.step"],
        ["mob.wolf.whine", "mob.wolf.whine"],
        ["mob.zombie.death", "mob.zombie.death"],
        ["mob.zombie.hurt", "mob.zombie.hurt"],
        ["mob.zombie.infect", "mob.zombie.infect"],
        ["mob.zombie.metal", "mob.zombie.metal"],
        ["mob.zombie.say", "mob.zombie.say"],
        ["mob.zombie.step", "mob.zombie.step"],
        ["mob.zombie.remedy", "mob.zombie.remedy"],
        ["mob.zombie.unfect", "mob.zombie.unfect"],
        ["mob.zombie.wood", "mob.zombie.wood"],
        ["mob.zombie.woodbreak", "mob.zombie.woodbreak"],
        ["mob.zombiepig.zpig", "mob.zombiepig.zpig"],
        ["mob.zombiepig.zpigangry", "mob.zombiepig.zpigangry"],
        ["mob.zombiepig.zpigdeath", "mob.zombiepig.zpigdeath"],
        ["mob.zombiepig.zpighurt", "mob.zombiepig.zpighurt"],
        ["note.bass", "note.bass"],
        ["note.bassattack", "note.bassattack"],
        ["note.bd", "note.bd"],
        ["note.harp", "note.harp"],
        ["note.hat", "note.hat"],
        ["note.pling", "note.pling"],
        ["note.snare", "note.snare"],
        ["portal.portal", "portal.portal"],
        ["portal.travel", "portal.travel"],
        ["portal.trigger", "portal.trigger"],
        ["random.anvil_break", "random.anvil_break"],
        ["random.anvil_land", "random.anvil_land"],
        ["random.anvil_use", "random.anvil_use"],
        ["random.bow", "random.bow"],
        ["random.bowhit", "random.bowhit"],
        ["random.break", "random.break"],
        ["random.breath", "random.breath"],
        ["random.burp", "random.burp"],
        ["random.chestclosed", "random.chestclosed"],
        ["random.chestopen", "random.chestopen"],
        ["random.classic_hurt", "random.classic_hurt"],
        ["random.click", "random.click"],
        ["random.door_close", "random.door_close"],
        ["random.door_open", "random.door_open"],
        ["random.drink", "random.drink"],
        ["random.eat", "random.eat"],
        ["random.explode", "random.explode"],
        ["random.fizz", "random.fizz"],
        ["random.fuse", "random.fuse"],
        ["random.glass", "random.glass"],
        ["random.levelup", "random.levelup"],
        ["random.orb", "random.orb"],
        ["random.pop", "random.pop"],
        ["random.successful_hit", "random.successful_hit"],
        ["random.wood_click", "random.wood_click"],
        ["step.cloth", "step.cloth"],
        ["step.grass", "step.grass"],
        ["step.gravel", "step.gravel"],
        ["step.ladder", "step.ladder"],
        ["step.sand", "step.sand"],
        ["step.snow", "step.snow"],
        ["step.stone", "step.stone"],
        ["step.wood", "step.wood"],
        ["tile.piston.in", "tile.piston.in"],
        ["tile.piston.out", "tile.piston.out"]
      ]
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": 140,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_playsound'] = function(block) {
  var dropdown_sound = block.getFieldValue('SOUND');

  var code = 'world.playSoundAtEntity(player, "' + dropdown_sound + '", 1, 1);\n';
  return code;
};



Blockly.Blocks['mciteminput'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mciteminput",
  "message0": "Item %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "ITEM",
      "options": [
            ["Apple", "apple"],
            ["Arrow", "arrow"],
            ["Baked Potato", "baked_potato"],
            ["Bed", "bed"],
            ["Beef", "beef"],
            ["Blaze Powder", "blaze_powder"],
            ["Blaze Rod", "blaze_rod"],
            ["Boat", "boat"],
            ["Bone", "bone"],
            ["Book", "book"],
            ["Bow", "bow"],
            ["Bowl", "bowl"],
            ["Bread", "bread"],
            ["Brewing Stand", "brewing_stand"],
            ["Brick", "brick"],
            ["Bucket", "bucket"],
            ["Cake", "cake"],
            ["Carrot", "carrot"],
            ["Carrot On A Stick", "carrot_on_a_stick"],
            ["Cauldron", "cauldron"],
            ["Chainmail Boots", "chainmail_boots"],
            ["Chainmail Chestplate", "chainmail_chestplate"],
            ["Chainmail Helmet", "chainmail_helmet"],
            ["Chainmail Leggings", "chainmail_leggings"],
            ["Chest Minecart", "chest_minecart"],
            ["Chicken", "chicken"],
            ["Clay Ball", "clay_ball"],
            ["Clock", "clock"],
            ["Coal", "coal"],
            ["Command Block Minecart", "command_block_minecart"],
            ["Comparator", "comparator"],
            ["Compass", "compass"],
            ["Cooked Beef", "cooked_beef"],
            ["Cooked Chicken", "cooked_chicken"],
            ["Cooked Fished", "cooked_fished"],
            ["Cooked Porkchop", "cooked_porkchop"],
            ["Cookie", "cookie"],
            ["Diamond", "diamond"],
            ["Diamond Axe", "diamond_axe"],
            ["Diamond Boots", "diamond_boots"],
            ["Diamond Chestplate", "diamond_chestplate"],
            ["Diamond Helmet", "diamond_helmet"],
            ["Diamond Hoe", "diamond_hoe"],
            ["Diamond Horse Armor", "diamond_horse_armor"],
            ["Diamond Leggings", "diamond_leggings"],
            ["Diamond Pickaxe", "diamond_pickaxe"],
            ["Diamond Shovel", "diamond_shovel"],
            ["Diamond Sword", "diamond_sword"],
            ["Dye", "dye"],
            ["Egg", "egg"],
            ["Emerald", "emerald"],
            ["Enchanted Book", "enchanted_book"],
            ["Ender Eye", "ender_eye"],
            ["Ender Pearl", "ender_pearl"],
            ["Experience Bottle", "experience_bottle"],
            ["Feather", "feather"],
            ["Fermented Spider Eye", "fermented_spider_eye"],
            ["Fire Charge", "fire_charge"],
            ["Firework Charge", "firework_charge"],
            ["Fireworks", "fireworks"],
            ["Fish", "fish"],
            ["Fishing Rod", "fishing_rod"],
            ["Flint", "flint"],
            ["Flint And Steel", "flint_and_steel"],
            ["Flower Pot", "flower_pot"],
            ["Furnace Minecart", "furnace_minecart"],
            ["Ghast Tear", "ghast_tear"],
            ["Glass Bottle", "glass_bottle"],
            ["Glowstone Dust", "glowstone_dust"],
            ["Gold Ingot", "gold_ingot"],
            ["Gold Nugget", "gold_nugget"],
            ["Golden Apple", "golden_apple"],
            ["Golden Axe", "golden_axe"],
            ["Golden Boots", "golden_boots"],
            ["Golden Carrot", "golden_carrot"],
            ["Golden Chestplate", "golden_chestplate"],
            ["Golden Helmet", "golden_helmet"],
            ["Golden Hoe", "golden_hoe"],
            ["Golden Horse Armor", "golden_horse_armor"],
            ["Golden Leggings", "golden_leggings"],
            ["Golden Pickaxe", "golden_pickaxe"],
            ["Golden Shovel", "golden_shovel"],
            ["Golden Sword", "golden_sword"],
            ["Gunpowder", "gunpowder"],
            ["Hopper Minecart", "hopper_minecart"],
            ["Iron Axe", "iron_axe"],
            ["Iron Boots", "iron_boots"],
            ["Iron Chestplate", "iron_chestplate"],
            ["Iron Door", "iron_door"],
            ["Iron Helmet", "iron_helmet"],
            ["Iron Hoe", "iron_hoe"],
            ["Iron Horse Armor", "iron_horse_armor"],
            ["Iron Ingot", "iron_ingot"],
            ["Iron Leggings", "iron_leggings"],
            ["Iron Pickaxe", "iron_pickaxe"],
            ["Iron Shovel", "iron_shovel"],
            ["Iron Sword", "iron_sword"],
            ["Item Frame", "item_frame"],
            ["ItemMapfilled Map", "ItemMapfilled_map"],
            ["ItemShearsshears", "ItemShearsshears"],
            ["Lava Bucket", "lava_bucket"],
            ["Lead", "lead"],
            ["Leather", "leather"],
            ["Leather Boots", "leather_boots"],
            ["Leather Chestplate", "leather_chestplate"],
            ["Leather Helmet", "leather_helmet"],
            ["Leather Leggings", "leather_leggings"],
            ["Magma Cream", "magma_cream"],
            ["Map", "map"],
            ["Melon", "melon"],
            ["Melon Seeds", "melon_seeds"],
            ["Milk Bucket", "milk_bucket"],
            ["Minecart", "minecart"],
            ["Mushroom Stew", "mushroom_stew"],
            ["Name Tag", "name_tag"],
            ["Nether Star", "nether_star"],
            ["Nether Wart", "nether_wart"],
            ["Netherbrick", "netherbrick"],
            ["Painting", "painting"],
            ["Paper", "paper"],
            ["Poisonous Potato", "poisonous_potato"],
            ["Porkchop", "porkchop"],
            ["Potato", "potato"],
            ["Potionitem", "potionitem"],
            ["Pumpkin Pie", "pumpkin_pie"],
            ["Pumpkin Seeds", "pumpkin_seeds"],
            ["Quartz", "quartz"],
            ["Record 11", "record_11"],
            ["Record 13", "record_13"],
            ["Record Blocks", "record_blocks"],
            ["Record Cat", "record_cat"],
            ["Record Chirp", "record_chirp"],
            ["Record Far", "record_far"],
            ["Record Mall", "record_mall"],
            ["Record Mellohi", "record_mellohi"],
            ["Record Stal", "record_stal"],
            ["Record Strad", "record_strad"],
            ["Record Wait", "record_wait"],
            ["Record Ward", "record_ward"],
            ["Redstone", "redstone"],
            ["Reeds", "reeds"],
            ["Repeater", "repeater"],
            ["Rotten Flesh", "rotten_flesh"],
            ["Saddle", "saddle"],
            ["Sign", "sign"],
            ["Skull", "skull"],
            ["Slime Ball", "slime_ball"],
            ["Snowball", "snowball"],
            ["Spawn Egg", "spawn_egg"],
            ["Speckled Melon", "speckled_melon"],
            ["Spider Eye", "spider_eye"],
            ["Stick", "stick"],
            ["Stone Axe", "stone_axe"],
            ["Stone Hoe", "stone_hoe"],
            ["Stone Pickaxe", "stone_pickaxe"],
            ["Stone Shovel", "stone_shovel"],
            ["Stone Sword", "stone_sword"],
            ["String", "string"],
            ["Sugar", "sugar"],
            ["Tnt Minecart", "tnt_minecart"],
            ["Water Bucket", "water_bucket"],
            ["Wheat", "wheat"],
            ["Wheat Seeds", "wheat_seeds"],
            ["Wooden Axe", "wooden_axe"],
            ["Wooden Door", "wooden_door"],
            ["Wooden Hoe", "wooden_hoe"],
            ["Wooden Pickaxe", "wooden_pickaxe"],
            ["Wooden Shovel", "wooden_shovel"],
            ["Wooden Sword", "wooden_sword"],
            ["Writable Book", "writable_book"],
            ["Written Book", "written_book"]
          
      ]
    }
  ],
  "output": null,
  "colour": 20,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};


Blockly.Java['mciteminput'] = function(block) {
  var dropdown_item = block.getFieldValue('ITEM');
  
  var code = 'Items.' + dropdown_item;
  return [code, Blockly.Java.ORDER_NONE];
};



Blockly.Blocks['mcaction_spawnitem'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcaction_spawnitem",
  "message0": "Spawn Item %1",
  "args0": [
    {
      "type": "input_value",
      "name": "input",
      "check": "mciteminput"
    }
  ],
  "previousStatement": "action",
  "nextStatement": "action",
  "colour": 140,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};

Blockly.Java['mcaction_spawnitem'] = function(block) {
  var value_item = Blockly.Java.valueToCode(block, 'input', Blockly.Java.ORDER_ATOMIC);
  var code = 
  'if(world.isRemote){return true;}\n' +
  'world.spawnEntityInWorld(new EntityItem(world, x+0.5f, y+1, z+0.5f, new ItemStack' + value_item + '));\n';
  return code;
};



Blockly.Blocks['mcitem'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcitem",
  "message0": "Minecraft Item %1 Name:  %2 %3 Max Stack Size: %4 %5 Options: %6 %7",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "NAME",
      "text": "change_me"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_input",
      "name": "AMOUNT",
      "text": "64"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": "actionitem"
    }
  ],
  "inputsInline": false,
  "colour": 20,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};


Blockly.Java['mcitem'] = function(block) {
  var value_name = make_java_id(block.getFieldValue('NAME'));
  var raw_value_name = block.getFieldValue('NAME');
  var value_amount = block.getFieldValue('AMOUNT');
  var statements_code = Blockly.Java.statementToCode(block, 'CODE');

  if(isNaN(parseInt(value_amount))){
    showError(block, "Max Stack Size must be a number!");
  }



  var code = 
  '    public class Mcitem_' + value_name + ' extends ItemBase {\n' + 
  '        public Mcitem_' + value_name + '() {\n' +
  '            super(BLOCK_ID, CREATIVE_TAB, "' + raw_value_name + '", ' + value_amount + '); \n' +
  '        }\n\n' +
          statements_code +
    '    }\n';
  return code;
};





Blockly.Blocks['mcitemoptions_rightclick'] = {
  
  init: function() {
    this.jsonInit({
      "type": "mcitemoptions_rightclick",
  "message0": "(NI) On Right Click %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "CODE",
      "check": "actionitem"
    }
  ],
  "previousStatement": "actionitem",
  "nextStatement": "actionitem",
  "colour": 20,
  "tooltip": "",
  "helpUrl": ""
    });
  }
};
