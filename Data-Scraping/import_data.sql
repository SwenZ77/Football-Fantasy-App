SET SESSION sql_mode = '';

CREATE TABLE all_teams_ucl (
    `Index` INT PRIMARY KEY,
    `Player` VARCHAR(100) NULL,
    `Nation` VARCHAR(50) NULL,
    `Pos` VARCHAR(10) NULL,
    `Age` INT NULL,
    `MP` INT NULL,
    `Starts` INT NULL,
    `Min` INT NULL,
    `90s` FLOAT NULL,
    `Gls` INT NULL,
    `Ast` INT NULL,
    `G+A` INT NULL,
    `G-PK` INT NULL,
    `PK` INT NULL,
    `PKatt` INT NULL,
    `CrdY` INT NULL,
    `CrdR` INT NULL,
    `xG` FLOAT NULL,
    `npxG` FLOAT NULL,
    `xAG` FLOAT NULL,
    `npxG+xAG` FLOAT NULL,
    `PrgC` FLOAT NULL,
    `PrgP` FLOAT NULL,
    `PrgR` FLOAT NULL,
    `Team` VARCHAR(100) NULL
);


LOAD DATA LOCAL INFILE 'path/to/all_teams_ucl.csv'
INTO TABLE all_teams_ucl
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(`Index`, @dummy2, `Player`, `Nation`, `Pos`, `Age`, `MP`, `Starts`, `Min`, `90s`, 
 `Gls`, `Ast`, `G+A`, `G-PK`, `PK`, `PKatt`, `CrdY`, `CrdR`, 
 `xG`, `npxG`, `xAG`, `npxG+xAG`, `PrgC`, `PrgP`, `PrgR`, `Team`,
 @extra1, @extra2, @extra3, @extra4, @extra5, @extra6, @extra7, @extra8)
SET
  Age = NULLIF(Age, ''),
  MP = NULLIF(MP, ''),
  Starts = NULLIF(Starts, ''),
  Min = NULLIF(Min, ''),
  `90s` = NULLIF(`90s`, ''),
  Gls = NULLIF(Gls, ''),
  Ast = NULLIF(Ast, ''),
  `G+A` = NULLIF(`G+A`, ''),
  `G-PK` = NULLIF(`G-PK`, ''),
  PK = NULLIF(PK, ''),
  PKatt = NULLIF(PKatt, ''),
  CrdY = NULLIF(CrdY, ''),
  CrdR = NULLIF(CrdR, ''),
  xG = NULLIF(xG, ''),
  npxG = NULLIF(npxG, ''),
  xAG = NULLIF(xAG, ''),
  `npxG+xAG` = NULLIF(`npxG+xAG`, ''),
  PrgC = NULLIF(PrgC, ''),
  PrgP = NULLIF(PrgP, ''),
  PrgR = NULLIF(PrgR, '');