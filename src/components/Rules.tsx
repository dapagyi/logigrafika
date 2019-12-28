import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { Component } from 'react';

type RulesState = {
  isDialogVisible: boolean;
};

export default class Rules extends Component<{}, RulesState> {
  state = {
    isDialogVisible: false,
  };

  handleClose = () => {
    this.setState({ isDialogVisible: false });
  };

  render() {
    return (
      <>
        <Dialog open={this.state.isDialogVisible} onClose={this.handleClose} aria-labelledby="simple-dialog-title">
          <DialogTitle id="simple-dialog-title">Leírás</DialogTitle>
          <DialogContent dividers={true}>
            <DialogContentText
              id="scroll-dialog-description"
              // ref={descriptionElementRef}
              tabIndex={-1}
              style={{ textAlign: 'justify' }}
            >
              {/* {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
              )
              .join('\n')} */}
              Ez a fejtörő rendkívül népszerű Japánban és a világ más országaiban is; vannak rejtvénymagazinok, melyek
              szinte csak ilyen feladványokat tartalmaznak különböző méretekben és nehézségi fokkal.
              <br />
              A feladatok a logika és a grafika különleges elegyét alkotják. A hálózatban található számok alapján a
              megfejtőnek kell eldöntenie, hogy mely négyzeteket színezi feketére. Helyes gondolatmenet esetén kialakul
              a megfejtés, amely egy sematikus ábra, vagy nagyobb feladvány esetén egy részletgazdag kép. Vizsgáljuk meg
              részletesebben a következő egyszerű logigrafikát! (1. ábra)
              <br />
              <img
                style={{ width: '60%', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
                alt="1. ábra"
                src="./img/rules/1. ábra.PNG"
              />
              <br />
              A vízszintes sorok bal szélén és a függőleges oszlopok tetején látható számok azt jelzik, hogy a fekete
              négyzetek hány csoportban találhatók az adott sorban vagy oszlopban, és az egyes csoportok hány összefüggő
              fekete négyzetből állnak. A 4 1 1 például azt jelenti, hogy ez az oszlop három darab fekete csoportot
              tartalmaz; először négyes, majd egyes és végül újra egyes következik. Fontos, hogy a csoportok között
              legalább egy négyzetnek fehéren kell maradnia. Természetesen fehér mezők a sorok, oszlopok kezdetén és
              végén is lehetnek. A hálózatban a vastagabb fekete vonalak csak a tájékozódást könnyítik meg.
              <br />
              <br />
              Most pedig néhány lépésben tekintsük át a megfejtés menetét!
              <br />
              Először a legnagyobb számokat és így a leghoszszabb csoportokat érdemes vizsgálni. Ha ez a szám nagyobb,
              mint a rendelkezésre álló hely hosszának a fele (ilyen most a negyedik sorban a 8), akkor középen néhány
              mezőt beszínezhetünk. A legalsó sorban minden mezőt be kell színezni, ez kiváló kiindulópont! (2. ábra)
              <br />
              <img
                style={{ width: '60%', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
                alt="2. ábra"
                src="./img/rules/2. ábra.PNG"
              />
              <br />
              Ezután berajzoljuk a nyilvánvaló következményeket. Mindenképpen hasznos megjelölni (például ponttal vagy
              x-szel) azokat a mezőket, amelyek biztosan nem lehetnek feketék. (3. ábra) Innen már többféle
              továbbhaladási lehetőség nyílik, ezek eredményeként előáll a megfejtés: egy megnyitott vízcsap. (4. ábra)
              <br />
              <img
                style={{ width: '60%', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
                alt="3. ábra"
                src="./img/rules/3. ábra.PNG"
              />
              <br />
              <img
                style={{ width: '60%', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
                alt="4. ábra"
                src="./img/rules/4. ábra.PNG"
              />
              <br />
              Forrás: <a href="http://www.mategye.hu/download/abacus/20172018/abacus_szeptember.pdf">mategye.hu</a>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Értem
            </Button>
          </DialogActions>
        </Dialog>

        <Button onClick={() => this.setState({ isDialogVisible: !this.state.isDialogVisible })}>
          Útmutató a kitöltéshez
        </Button>
      </>
    );
  }
}
