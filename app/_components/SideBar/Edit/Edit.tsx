"use client";

import { ContainerConfig } from "@/app/_data/flexbox/containerConfig";
import { Container, ItemStyle,  } from "@/app/types";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./Edit.module.scss";
import EditContainer from "./EditContainer/EditContainer";
import EditItems from "./EditItems/EditItems";

interface Props {
   selectedItems: number[];
   editContainer: (key: keyof Container, value: string) => void;
   container: Container;
   configContainer: ContainerConfig[];
   selectedItemStyles: ItemStyle | undefined;
   editItemStyle: (key: keyof ItemStyle, value: string) => void;
}

function Edit({
   selectedItems,
   editContainer,
   container,
   configContainer,
   selectedItemStyles,
   editItemStyle,
}: Props) {
   const [switchState, setSwitchState] = useState(selectedItems.length ? 2 : 1);

   useEffect(() => {
      if (selectedItems.length) setSwitchState(2);
   }, [selectedItems]);

   return (
      <div className={styles.edit}>
         <div className={styles.tab_switcher}>
            <div
               className={styles.switch}
               data-active={switchState === 1}
               onClick={() => setSwitchState(1)}
            >
               Container
            </div>
            <div
               className={styles.switch}
               data-active={switchState === 2}
               onClick={() => setSwitchState(2)}
            >
               Items
            </div>
         </div>

         <AnimatePresence mode="wait" initial={false}>
            <motion.div
               key={switchState}
               className={styles.container}
               animate={{ opacity: 1, y: 0 }}
               initial={{ opacity: 0, y: 5 }}
               exit={{ opacity: 0, y: -5 }}
               transition={{ duration: 0.15 }}
            >
               {switchState === 1 && (
                  <EditContainer
                     editContainer={editContainer}
                     container={container}
                     configContainer={configContainer}
                  />
               )}
               {switchState === 2 && (
                  <EditItems
                     selectedItemStyles={selectedItemStyles}
                     editItemStyle={editItemStyle}
                  />
               )}
            </motion.div>
         </AnimatePresence>
      </div>
   );
}

export default Edit;