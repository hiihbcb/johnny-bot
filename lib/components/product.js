import styles from '../../styles/components/Product.module.scss'
import { React, useState } from 'react'
import { setProduct, getCategories, getCorps } from '../web/apis'

export default function Product({ product = null }) {
  const [openModal, setOpenModal] = useState(false)

    return (
      <>
        <a className={styles.button} onClick={() => setOpenModal(true)} >{product ? 'Edit Product' : 'New Product'}</a>
        <EditProduct isOpen={openModal} close={() => setOpenModal(false)} product={product}/>
      </>
    )
}

function EditProduct({isOpen, close, product = null}) {

  const [name, setName] = useState(product ? product.name : "");
  const [corpName, setCorpName] = useState(product ? product.corp_name : "");
  const [shortDesc, setShortDesc] = useState(product ? product.short_desc : "");
  const [type, setType] = useState(product ? product.type : "");
  const [requirements, setRequirements] = useState(product ? product.requirements : "");
  const [cost, setCost] = useState(product ? product.cost : "");
  const [subCost, setSubCost] = useState(product ? product.subscription_cost : "");
  const [wSkill, setWSkill] = useState(product ? product.w_skill : "");
  const [wDamage, setWDamage] = useState(product ? product.w_damage : "");
  const [wMagazine, setWMagazine] = useState(product ? product.w_magazine : "");
  const [wRof, setWRof] = useState(product ? product.w_rof : "");
  const [wHands, setWHands] = useState(product ? product.w_hands : "");
  const [wConcealed, setWConcealed] = useState(product ? product.w_concealed : "");
  const [aSp, setASp] = useState(product ? product.a_sp : "");
  const [aCeal, setACeal] = useState(product ? product.a_ceal : "");
  const [cInstall, setCInstall] = useState(product ? product.c_install : "");
  const [cHumanity, setCHumanity] = useState(product ? product.c_humanity : "");
  const [nPer, setNPer] = useState(product ? product.n_per : "");
  const [nSpd, setNSpd] = useState(product ? product.n_spd : "");
  const [nAtk, setNAtk] = useState(product ? product.n_atk : "");
  const [nDef, setNDef] = useState(product ? product.n_def : "");
  const [nRez, setNRez] = useState(product ? product.n_rez : "");
  const [vSpd, setVSpd] = useState(product ? product.v_sdp : "");
  const [vSp, setVSp] = useState(product ? product.v_sp : "");
  const [vMove, setVMove] = useState(product ? product.v_move : "");
  const [vStats, setVStats] = useState(product ? product.v_stats : "");
  const [description, setDescription] = useState(product ? product.description : "");


  if (isOpen) {
    return (
      <div className={styles.modal}>
        <a className={styles.close} onClick={close}>Close</a>
        <form onSubmit={handleSubmit}>

          <FormItem name="Name" type="text" id="name" value={name} setValue={setName} required="true"/>
          <FormItem name="Corp" type="text" id="corp_name" value={corpName} setValue={setCorpName} />
          <FormItem name="Info" type="text" id="short_desc" value={shortDesc} setValue={setShortDesc} />
          <FormItem name="Type" type="text" id="type" value={type} setValue={setType} />
          <FormItem name="Restrictions" type="text" id="requirements" value={requirements} setValue={setRequirements} />
          <FormItem name="Cost" type="number" id="cost" value={cost} setValue={setCost} required="true" />
          <FormItem name="Cost p/m" type="number" id="subscription_cost" value={subCost} setValue={setSubCost} />
          <FormItem name="Weapon Skill" type="text" id="w_skill" value={wSkill} setValue={setWSkill} />
          <FormItem name="Weapon Damage" type="text" id="w_damage" value={wDamage} setValue={setWDamage} />
          <FormItem name="Magazine" type="text" id="w_magazine" value={wMagazine} setValue={setWMagazine} />
          <FormItem name="Rate of Fire" type="text" id="w_rof" value={wRof} setValue={setWRof} />
          <FormItem name="Hands Required" type="text" id="w_hands" value={wHands} setValue={setWHands} />
          <FormItem name="Can be Concealed" type="text" id="w_concealed" value={wConcealed} setValue={setWConcealed} />
          <FormItem name="SP" type="text" id="a_sp" value={aSp} setValue={setASp} />
          <FormItem name="CEAL Slots" type="text" id="a_ceal" value={aCeal} setValue={setACeal} />
          <FormItem name="Install Level" type="text" id="c_install" value={cInstall} setValue={setCInstall} />
          <FormItem name="Humanity Loss" type="text" id="c_humanity" value={cHumanity} setValue={setCHumanity} />
          <FormItem name="Program Perception" type="text" id="n_per" value={nPer} setValue={setNPer} />
          <FormItem name="Program Speed" type="text" id="n_spd" value={nSpd} setValue={setNSpd} />
          <FormItem name="Program Attack" type="text" id="n_atk" value={nAtk} setValue={setNAtk} />
          <FormItem name="Program Defence" type="text" id="n_def" value={nDef} setValue={setNDef} />
          <FormItem name="Program Rez" type="text" id="n_rez" value={nRez} setValue={setNRez} />
          <FormItem name="SDP" type="text" id="v_sdp" value={vSpd} setValue={setVSpd} />
          <FormItem name="SP" type="text" id="v_sp" value={vSp} setValue={setVSp} />
          <FormItem name="Move" type="text" id="v_move" value={vMove} setValue={setVMove} />
          <FormItem name="Stats" type="text" id="v_stats" value={vStats} setValue={setVStats} />

          <label>Description:</label>
          <textarea name="description" value={description} onChange={e => setDescription(e.target.value)} />

          <button className={styles.submit} type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

function handleSubmit(event) {
    console.log(event.target.elements.username.value)
}

function FormItem({name, type, id, value, setValue, required = false}) {
  return (
    <>
      <label>{name}:</label>
      <input type={type} name={id} value={value} onChange={e => setValue(e.target.value)} required={required} />
    </>
    )
}
