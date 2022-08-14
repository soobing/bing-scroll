interface Options {
  height: number;
  selectedIndex: number;
  onChangeCallback?: (index: number) => void;
}
class BingScroll {
  dragging = false;
  offsetY = 0;
  previousY = 0;
  _positionY = 0;
  _selectedIndex = 0;
  onChangeCallback: Options["onChangeCallback"];
  wrapperEl: HTMLElement | null = null;
  pickerEl: HTMLElement | null = null;
  listEl: HTMLElement | null = null;
  beforeEl: HTMLElement | null = null;
  afterEl: HTMLElement | null = null;

  OPTION_HEIGHT = 50;
  TOP_COUNT = 1; // TODO: 옵션으로 받기
  BOTTOM_COUNT = 2; // TODO: 옵션으로 받기
  MAX_POSITION_Y = 0; // TODO: 옵션으로 받기
  OPTION_LENGTH = 0;

  constructor(
    element: HTMLElement,
    options: Options = { height: 50, selectedIndex: 0 }
  ) {
    const { height = 50, selectedIndex = 0, onChangeCallback } = options;
    this.wrapperEl = element;
    this.pickerEl = element.querySelector(".picker"); // TODO: 옵션으로 받기
    this.listEl = element.querySelector(".picker__list"); // TODO: 옵션으로 받기

    if (!this.pickerEl) {
      throw new Error(".picker 가 존재하지 않습니다.");
    }
    if (!this.listEl) {
      throw new Error(".picker__list 가 존재하지 않습니다.");
    }

    this.listEl.addEventListener("mousedown", this.onMouseDown);
    this.listEl.addEventListener("touchstart", this.onMouseDown);

    this.OPTION_HEIGHT = height;
    this.selectedIndex = selectedIndex;

    this.onChangeCallback = onChangeCallback;
    this.OPTION_LENGTH = this.listEl.children.length;
    this.MAX_POSITION_Y = -this.OPTION_LENGTH * this.OPTION_HEIGHT;

    this.positionY = -this.selectedIndex * this.OPTION_HEIGHT;

    this.setWrapperCSS();
    this.setPickerCSS();
    this.setListStyle();
    this.setListItemStyle();
  }

  destroy() {
    this.listEl?.removeEventListener("mousedown", this.onMouseDown);
    this.listEl?.removeEventListener("touchstart", this.onMouseDown);
  }

  get positionY() {
    return this._positionY;
  }
  set positionY(value) {
    this._positionY = value;
    this._selectedIndex = Math.round(-this._positionY / this.OPTION_HEIGHT);

    this.listEl!.style.transition = `transform ${
      Math.abs(this.offsetY) / 100 + 0.1
    }s`;
    this.listEl!.style.transform = `translateY(${this._positionY}px)`;
  }

  get selectedIndex() {
    return this._selectedIndex;
  }
  set selectedIndex(value) {
    this._positionY = -value * this.OPTION_HEIGHT;
    this._selectedIndex = value;
  }

  setWrapperCSS = () => {
    this.wrapperEl!.style.padding = `${
      this.TOP_COUNT * this.OPTION_HEIGHT
    }px 0px ${this.BOTTOM_COUNT * this.OPTION_HEIGHT}px 0px`;
  };

  setPickerCSS = () => {
    // TODO: picker의 before, after 스타일값 옵션에 맞게 set
  };

  setListStyle = () => {
    this.listEl!.style.transform = `translateY(-${
      this.selectedIndex * this.OPTION_HEIGHT
    }px)`;
  };

  setListItemStyle = () => {
    // TODO: height 변수화 필요
  };

  onMouseDown = (e: any) => {
    this.previousY = e.touches ? e.touches?.[0]?.clientY : e.clientY;
    this.dragging = true;
    e.preventDefault();

    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("touchmove", this.onMouseMove);
    window.addEventListener("mouseup", this.onMouseUp);
    window.addEventListener("touchend", this.onMouseUp);
  };

  onMouseMove = (e: any) => {
    if (!this.dragging) return;

    const currentY = e.touches ? e.touches?.[0]?.clientY : e.clientY;

    this.offsetY = currentY - this.previousY;
    const _position = this.positionY + this.offsetY;

    this.positionY = Math.max(
      this.MAX_POSITION_Y,
      Math.min(this.OPTION_HEIGHT, _position)
    );

    this.previousY = currentY;
  };

  onMouseUp = () => {
    this.dragging = false;

    const maxPosition = -(this.OPTION_LENGTH - 1) * this.OPTION_HEIGHT;

    const rounderPosition =
      Math.round((this.positionY + this.offsetY * 5) / this.OPTION_HEIGHT) *
      this.OPTION_HEIGHT;
    const finalPosition = Math.max(maxPosition, Math.min(0, rounderPosition));

    this.positionY = finalPosition;
    this.selectedIndex = -this.positionY / this.OPTION_HEIGHT;
    this.onChangeCallback?.(this.selectedIndex);

    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("touchmove", this.onMouseMove);
    window.removeEventListener("mouseup", this.onMouseUp);
    window.removeEventListener("touchend", this.onMouseUp);
  };
}

export default BingScroll;
