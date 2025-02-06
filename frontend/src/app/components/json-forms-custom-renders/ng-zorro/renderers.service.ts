import { Injectable } from "@angular/core";
import { verticalLayoutTester, VerticalLayoutRenderer } from "@jsonforms/angular-material";
import { BooleanControlTester, BooleanControlRenderer } from "./boolean-renderer.component";
import { StringRendererTester, StringRendererComponent } from "./string-renderer.component";


@Injectable({ providedIn: "root" })
export class RendererService {
  constructor() { }

  getRenderers() {
    const renderers = [
      // { tester: integerRendererTester, renderer: IntegerRendererComponent },
      { tester: StringRendererTester, renderer: StringRendererComponent },
      { tester: BooleanControlTester, renderer: BooleanControlRenderer },
      { tester: verticalLayoutTester, renderer: VerticalLayoutRenderer },
    ];

    return renderers
  }
}
